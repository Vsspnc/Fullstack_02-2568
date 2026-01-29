// ให้ string 2 ตัว (str1, str2) และตัวเลข length
// ให้หา substring ทุกตัวใน str1 ที่มีความยาว = length
// และ substring นั้นต้อง “ไม่ปรากฏอยู่ใน str2”
// โดยผลลัพธ์ต้อง ไม่ซ้ำกัน
function findUniqueSubstrings(str1, str2, length) {
    // สร้าง Set เพื่อเก็บผลลัพธ์
    // ใช้ Set เพราะไม่ต้องการ substring ที่ซ้ำกัน
    const result = new Set();
    // วนลูปผ่าน str1
    // หยุดที่ str1.length - length เพื่อไม่ให้ตัดเกินความยาว string
    for (let i = 0; i <= str1.length - length; i++) {

        // ตัด substring จาก str1
        // เริ่มที่ตำแหน่ง i และยาวตามค่าที่กำหนด (length)
        const substring = str1.slice(i, i + length);

        // ตรวจสอบว่า substring นี้ "ไม่อยู่" ใน str2
        if (!str2.includes(substring)) {
            // ถ้าไม่อยู่ใน str2 ให้นำ substring ใส่ลงใน Set
            // ถ้าซ้ำ Set จะไม่เพิ่มให้เอง
            result.add(substring);
        }
    }
    // แปลง Set เป็น Array ก่อนส่งค่ากลับ
    return Array.from(result);
}
// ตัวอย่างที่ 1
// "abc" อยู่ใน str2 → ไม่เอา
// substring อื่นที่ไม่อยู่ใน str2 จะถูกเก็บไว้
console.log(findUniqueSubstrings("abcdefg", "xyzabc", 3));
// ตัวอย่างที่ 2
// หาทุก substring ยาว 2 ตัวจาก "hello world"
// ที่ไม่ปรากฏใน "world peace"
console.log(findUniqueSubstrings("hello world", "world peace", 2));
// ตัวอย่างที่ 3
// substring ที่ตัดได้คือ "aa" แต่ "aa" อยู่ใน "aaa"
// ดังนั้นผลลัพธ์จะเป็น array ว่าง
console.log(findUniqueSubstrings("aaaaaa", "aaa", 2));
