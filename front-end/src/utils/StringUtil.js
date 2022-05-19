/*
    설명 : null , '', undefined 인지 확인하는 함수
    param : 전체 타입
    return : boolean
*/
export const isEmpty = (str) => {
  if (typeof str == 'undefined' || str == null || str == '') return true;
  else return false;
};

export const isBlank = (str) => {
  if (typeof str == 'undefined' || str == null || str == '' || str == ' ')
    return true;
  else return false;
};
