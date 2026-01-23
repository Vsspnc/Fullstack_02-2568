// ประกาศฟังก์ชัน lengthOfLongSubstring รับค่า s ซึ่งเป็น string
function lengthOfLongSubstring(s) {
  // ตรวจสอบกรณี string ว่าง
  // ถ้า s ไม่มีตัวอักษรเลย ให้คืนค่า maxLen = 0 และ longestSubstring เป็น string ว่าง
  if (s.length === 0) {
    return { maxLen: 0, longestSubstring: "" };
  }
  // สร้าง Map เพื่อเก็บตำแหน่งล่าสุดของตัวอักษรแต่ละตัว
  // key = ตัวอักษร, value = index ที่พบล่าสุด
  let charMap = new Map();
  // ตัวแปร start ใช้เก็บตำแหน่งเริ่มต้นของ substring ปัจจุบัน
  let start = 0;
  // ตัวแปรเก็บความยาวของ substring ที่ยาวที่สุดที่เคยพบ
  let maxLength = 0;
  // ตัวแปรเก็บ substring ที่ยาวที่สุดและไม่มีตัวอักษรซ้ำ
  let longestSubstring = "";
  // วนลูปผ่าน string ทีละตัวอักษร โดย end คือจุดสิ้นสุดของ substring
  for (let end = 0; end < s.length; end++) {
    // ตรวจสอบว่าตัวอักษร s[end] เคยปรากฏมาก่อนหรือไม่
    if (charMap.has(s[end])) {
      // ถ้าเคยเจอแล้ว ให้เลื่อน start ไปตำแหน่งถัดจากตำแหน่งที่ซ้ำ
      // ใช้ Math.max เพื่อป้องกัน start ถอยหลัง
      start = Math.max(charMap.get(s[end]) + 1, start);
    }
    // บันทึกตำแหน่งล่าสุดของตัวอักษร s[end] ลงใน Map
    charMap.set(s[end], end);
    // คำนวณความยาวของ substring ปัจจุบัน
    // สูตร = ตำแหน่งสิ้นสุด - ตำแหน่งเริ่ม + 1
    let currentLength = end - start + 1;
    // ถ้าความยาวปัจจุบันมากกว่าค่ามากสุดเดิม
    if (currentLength > maxLength) {
      // อัปเดตความยาวมากที่สุด
      maxLength = currentLength;
      // ตัด substring ตั้งแต่ start ถึง end (ต้อง +1 เพราะ substring ไม่รวม end)
      longestSubstring = s.substring(start, end + 1);
    }
  }
  // คืนค่าเป็น object ที่มีความยาวมากที่สุด และ substring ที่ยาวที่สุด
  return {
    maxLen: maxLength,
    longestSubstring: longestSubstring
  };
}
// ทดสอบฟังก์ชัน
// ควรได้ { maxLen: 3, longestSubstring: 'abc' }
console.log(lengthOfLongSubstring("abcabcbb"));
// ควรได้ { maxLen: 1, longestSubstring: 'b' }
console.log(lengthOfLongSubstring("bbbbb"));
