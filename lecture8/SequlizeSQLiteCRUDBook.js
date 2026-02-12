const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const sequelize = new Sequelize('database', 'username', 'password',{
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/SQBooks.sqlite'
});

const Book = sequelize.define('Book', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//create the table if it doesn't exist
sequelize.sync()

app.get("/", (req, res) => {
  res.send("Hello Book CRUD World! by Visitsak Phenongchum");
});


//route to get all books
app.get ('/books',(req,res)=>{
    Book.findAll().then(books=>{
        res.json(books);
    }).catch(err=>{
        res.status(500).send(err.message);
    });
});

app.get('/books/:id',(req,res)=>{
    Book.findByPk(req.params.id).then(book=>{
        if(!book){
            res.status(404).send('Book not found');
        }else{
            res.json(book);
        }
    }).catch(err=>{
        res.status(500).send(err.message);
    });
});

app.post('/books',(req,res)=>{
    Book.create(req.body).then(book=>{
        res.send(book);
    }).catch(err=>{
        res.status(500).send(err.message);
    });
});

app.put('/books/:id',(req,res)=>{
    Book.findByPk(req.params.id).then(book=>{
        if(!book){
            res.status(404).send('Book not found');
        }else{
            book.update(req.body).then(updatedBook=>{
                res.json(updatedBook);
            }).catch(err=>{
                res.status(500).send(err.message);
            });
        }
    }).catch(err=>{
        res.status(500).send(err.message);
    });
});

app.delete('/books/:id',(req,res)=>{
    Book.findByPk(req.params.id).then(book=>{
        if(!book){
            res.status(404).send('Book not found');
        }else{
            book.destroy().then(()=>{
                res.send('Book deleted');
            }).catch(err=>{
                res.status(500).send(err.message);
            });
        }
    }).catch(err=>{
        res.status(500).send(err.message);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`));