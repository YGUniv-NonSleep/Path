/*
  영문 대소문자, 숫자, 특수문자(-, *, =, ., @)를 포함한 6자 이상 64자 이하의 값이어야 합니다.
 */

function RandomString() {
  const nums = '0123456789';
  const lowerChars = 'abcdefghiklmnopqrstuvwxyz';
  const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ';
  const specialChars = '-_=';
  const stringLength = parseInt(Math.random() * (64-6)) + 6;

  let randomString = '';
  
  for (let i = 0; i < stringLength; i++) {
    let ran = parseInt(Math.random() * 4) + 1
    let count = parseInt(Math.random()) + 1
    for (let j = 0; j < count; j++) {
      let ranChar;
      // if(i == 1) ran = 1
      // if(i == 2) ran = 2
      // if(i == 3) ran = 3
      // if(i == 4) ran = 4
      switch(ran) {
        case 1: {
          ranChar = Math.floor(Math.random() * nums.length)
          randomString += nums.substring(ranChar, ranChar + 1)
          break
        }
        case 2: {
          ranChar = Math.floor(Math.random() * lowerChars.length)
          randomString += lowerChars.substring(ranChar, ranChar + 1)
          break
        } 
        case 3: {
          ranChar = Math.floor(Math.random() * upperChars.length)
          randomString += upperChars.substring(ranChar, ranChar + 1)
          break
        }
        case 4: {
          ranChar = Math.floor(Math.random() * specialChars.length)
          randomString += specialChars.substring(ranChar, ranChar + 1)
          break
        }
      }
    } 
  }
  
  return randomString
}

export default RandomString