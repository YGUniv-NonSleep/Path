/*
    str이 null , '', undefined 인지 확인하는 함수
*/
export const isEmpty = (str) => {
  if (typeof str == 'undefined' || str == null || str == '') return true;
  else return false;
};
