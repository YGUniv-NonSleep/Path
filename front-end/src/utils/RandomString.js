/*
    영문 대소문자, 숫자, 특수문자 -, _, =로 이루어진 6자 이상 64자 이하의 문자열 생성
 */

function RandomString() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%^&*()_+-='
  const stringLength = parseInt(Math.random() * (64-6)) + 6
  let randomString = ''
  
  for (let i = 0; i < stringLength; i++) {
    const rNum = Math.floor(Math.random() * chars.length)
    randomString += chars.substring(rNum, rNum + 1)
  }

  return randomString
}

export default RandomString