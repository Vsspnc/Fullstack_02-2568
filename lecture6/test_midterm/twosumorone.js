// ฟังก์ชันหาชุดตัวเลขที่ใช้ได้ 1 ตัว หรือ 2 ตัว แล้วบวกได้เท่ากับ targetSum
function twoSumOrOne(arr, targetSum) {
  let result = []; 
  // สร้าง array เพื่อเก็บผลลัพธ์ (ชุดตัวเลขที่บวกได้เท่ากับ targetSum)
  // ===== กรณีที่ 1: ใช้ตัวเลขเพียง 1 ตัว =====
  for (let i = 0; i < arr.length; i++) { 
    // วนลูปผ่านทุกตัวใน array
    if (arr[i] === targetSum) { 
      // ถ้าตัวเลขตัวเดียวเท่ากับ targetSum

      result.push([arr[i]]); 
      // เก็บตัวเลขนั้นใน result (ใส่เป็น array เช่น [5])
    }
  }
  // ===== กรณีที่ 2: ใช้ตัวเลข 2 ตัว =====
  for (let i = 0; i < arr.length; i++) { 
    // ลูปตัวแรก เลือกตัวเลขตัวที่ i
    for (let j = i + 1; j < arr.length; j++) { 
      // ลูปตัวที่สอง เลือกตัวเลขตัวที่ j (เริ่มจาก i+1 เพื่อไม่ให้ซ้ำ)
      if (arr[i] + arr[j] === targetSum) { 
        // ถ้าผลบวกของสองตัวเท่ากับ targetSum

        result.push([arr[i], arr[j]]); 
        // เก็บคู่ตัวเลขที่บวกได้ลงใน result เช่น [2, 3]
      }
    }
  }
  // ส่งผลลัพธ์ออกมาเป็น string (รูปแบบที่กำหนดเอง)
  return `output: { maxlength : ${result.length}, subbarray : [${result}] }`;
}
// ตัวอย่างที่ 1
console.log(twoSumOrOne([1, 2, 3, 4, 5], 5));
// คาดหวัง: [5], [1,4], [2,3]
// ตัวอย่างที่ 2
console.log(twoSumOrOne([2, 4, 6, 10, 12, 14], 16));
// คาดหวัง: [2,14], [4,12], [6,10]
// ตัวอย่างที่ 3
console.log(twoSumOrOne([1, 3, 5, 7, 9], 8));
// คาดหวัง: [1,7], [3,5]

// function groupNumbers(arr, targetSum) {
//   let groups = []; 
//   // เก็บชุดตัวเลขที่ผลรวมเท่ากับ targetSum

//   // ===== กรณีใช้ตัวเลข 1 ตัว =====
//   for (let i = 0; i < arr.length; i++) {

//     if (arr[i] === targetSum) {
//       groups.push([arr[i]]); 
//       // สร้างชุดที่มีเลขตัวเดียว
//     }
//   }
//   // ===== กรณีใช้ตัวเลข 2 ตัว =====
//   for (let i = 0; i < arr.length; i++) {

//     for (let j = i + 1; j < arr.length; j++) {

//       if (arr[i] + arr[j] === targetSum) {
//         groups.push([arr[i], arr[j]]);
//         // สร้างชุดที่มีเลขสองตัว
//       }
//     }
//   }

//   return groups;
// }

// // ตัวอย่างที่ 1
// console.log(groupNumbers([1, 2, 3, 4, 5], 5));
// // คาดหวัง: [5], [1,4], [2,3]
// // ตัวอย่างที่ 2
// console.log(groupNumbers([2, 4, 6, 10, 12, 14], 16));
// // คาดหวัง: [2,14], [4,12], [6,10]
// // ตัวอย่างที่ 3
// console.log(groupNumbers([1, 3, 5, 7, 9], 8));
// // คาดหวัง: [1,7], [3,5]