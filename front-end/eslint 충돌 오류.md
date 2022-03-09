CRA로 프로젝트를 만들 때 같이 생성되는 eslint와 VSC extension으로 다운받은 Prettier 간에 충돌이 일어나서 생긴 오류입니다.

저 같은 경우 ES7+ React 어쩌구 하는 extension을 받았었는데 거기에 있던 eslint와 충돌이 발생했었습니다.

해결 방법으로 es7+ 어쩌구 하는 extension을 제거하고 package-lock.json와 node_modules 삭제 후 
package.json을 토대로 npm i 명령어로 package-lock.json와 node_modules를 재생성 해준 후 실행하니 잘 실행되었습니다.

오류가 생긴다면 참고바랍니다.