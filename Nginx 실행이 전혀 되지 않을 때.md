아무런 변화가 없을 때 logs/error.log 에 가서 1차적으로 확인을 합니다.
만약 2022/03/08 15:34:22 [emerg] 5112#22836: CreateDirectory() "C:\Users\bon300-19\Desktop\Path\nginx-1.18.0/temp/client_body_temp" failed (3: The system cannot find the path specified)

이와 같은 오류는 기본적으로 생성되어 있어야할 temp 폴더가 있지 않아서 생긴 문제입니다.
다음과 같이 nginx-1.18.0 하위에 폴더를 생성해주면 해결 됩니다.
nginx-1.18.0/temp/client_body_temp 
