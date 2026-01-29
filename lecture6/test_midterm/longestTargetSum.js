// ประกาศฟังก์ชัน longestUniqueTargetSum
// รับค่า arr (array ของตัวเลข) และ targetSum (ค่าผลรวมที่ต้องการ)
function longestUniqueTargetSum(arr, targetSum) {
    // สร้าง array สำหรับเก็บ subarray ที่เข้าเงื่อนไขทั้งหมด
    var result = [];
    // ตัวแปร sizewin ใช้กำหนดขนาดของ subarray (window size)
    // เริ่มต้นที่ขนาด 1
    let sizewin = 1;
    // loop ชั้นนอก ใช้ควบคุมจำนวนรอบในการเพิ่มขนาด window
    // (ตัวแปร i ไม่ได้ใช้โดยตรง แต่ใช้เพื่อให้วนครบ arr.length รอบ)
    for (let i = 0; i < arr.length; i++){
        // loop ชั้นใน ใช้เลื่อนตำแหน่งเริ่มต้นของ subarray
        for (let k = 0; k < arr.length; k++){
            // ตัด subarray จาก arr
            // เริ่มที่ตำแหน่ง k และมีความยาวเท่ากับ sizewin
            // แล้วนำไปใส่ใน Set เพื่อตัดค่าที่ซ้ำกันออก
            let sett = new Set(arr.slice(k, k + sizewin));
            // แปลง Set กลับเป็น Array เพื่อใช้งานต่อ
            let seta = Array.from(sett);
            // ตรวจสอบว่า
            // ถ้าความยาวของ array หลังแปลงเท่ากับ sizewin
            // แสดงว่า subarray นี้ไม่มีค่าซ้ำกัน
            if (seta.length === sizewin){
                // คำนวณผลรวมของค่าทั้งหมดใน subarray
                // accumulator ใช้เก็บผลรวมชั่วคราว
                let sum = seta.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                );
                // ตรวจสอบว่าผลรวมของ subarray เท่ากับ targetSum หรือไม่
                if (sum === targetSum){

                    // ถ้าตรงเงื่อนไข ให้นำ subarray นี้เก็บลงใน result
                    result.push(seta);
                }
            }
        }
        // เพิ่มขนาดของ window เพื่อไปตรวจสอบ subarray ที่ยาวขึ้น
        sizewin++;
    }
    // คืนค่าผลลัพธ์เป็น string
    // maxlength คือจำนวน subarray ที่เข้าเงื่อนไข
    // subbarray คือรายการ subarray ทั้งหมดที่พบ
    return `output: { maxlength : ${result.length}, subbarray : [${result}] }`
}
// ตัวอย่างที่ 1
// arr = [1,2,3,4,5], targetSum = 5
// subarray ที่เข้าเงื่อนไข เช่น [5], [2,3]
console.log(longestUniqueTargetSum([1, 2, 3, 4, 5], 5));
// ตัวอย่างที่ 2
// arr = [2,4,6,10,12,14], targetSum = 16
// subarray ที่เข้าเงื่อนไข เช่น [6,10]
console.log(longestUniqueTargetSum([2, 4, 6, 10, 12, 14], 16));
// ตัวอย่างที่ 3
// arr = [1,3,5,7,9], targetSum = 8
// subarray ที่เข้าเงื่อนไข เช่น [1,7], [3,5]
console.log(longestUniqueTargetSum([1, 3, 5, 7, 9], 8));
