# 💻CRUD_Node_project

> Goal: RDB(MySQL) 데이터 모델링, JWT, Express Middleware를 이용한 인증 로직 추가

<br />

> [👉 배포 링크](http://woogi.shop:3080/api/posts)

<br>

# 📃구현 목표

1. **API 명세서를 작성하여**, 최종적 결과물을 미리 파악합니다.
2. **MySQL, Sequelize를** 이용해 데이터베이스를 설계하고 활용합니다.
    - 데이터 모델링을 통해 **ERD 작성**
    - Sequelize를 이용한 **마이그레이션 코드 및 스키마 코드 작성**
    - **JOIN**을 통해 다른 Table의 데이터와 결합
3. **인증 관련 기능을 구현**합니다.
    - **JWT**(AccessToken)의 이해
    - 회원가입 API, 로그인 API, 내 정보 조회 API, 인증 **Middleware** 구현
    - 상품 관련 기능에 인증 로직 추가

<br />

# 📁 폴더 구조

```bash
📦Node-Skilled-Project
┣📂bcrypt
┃ ┗ 📜bcrypt.js
┣📂lib
┃ ┗ 📜CustomError.js
┣📂config
┃ ┗ 📜config.js
┣📂middlewares
┃ ┗ 📜auth_middleware.js
┃ ┗ 📜ErrorHandler.js
┣📂migrations
┃ ┗ 📜20231110135910-create-users.js
┃ ┗ 📜20231110140656-create-posts.js
┣📂node_modules
┣📂models
┃ ┗ 📜index.js
┃ ┗ 📜posts.js
┃ ┗ 📜users.js
┣📂routes
┃ ┗ 📜auth.js
┃ ┗ 📜posts.js
┃ ┗ 📜users.js
┣📂seaders
┣ 📜.gitignore
┣ 📜.prettierrc
┣ 📜app.js
┣ 📜package.json
┣ 📜yarn.lock
┗ 📜README.md
```

<br />

# ⛏ 기술 스텍

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"><img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"><img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"><img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white"><img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"><img src="https://img.shields.io/badge/amazonec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"><img src="https://img.shields.io/badge/amazonrds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white"><img src="https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white"><img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">

<br />

# 📜 API

<br>

> [👉 API 명세서 링크](https://www.notion.so/cd88263d7588429ba53507fd2cf486c4?v=89235766e7e0453f925be084ab48a9de&pvs=4)


# 📑 ERD link

![image](https://github.com/heyfuxkingcheez/Node-skilled-project/assets/143869354/dc6c7deb-1566-42d1-be43-6b4ef7e0bb63)


> [👉 ERD Cloud 링크](https://www.erdcloud.com/p/FSvRMSTyDhFsu3igX)

<br />

# 📚 To Do List

## 1. Directory setting

-   [x] GIT 레포지 생성
-   [x] 모델링을 통해 ERD 작성
-   [x] EXPRESS
-   [x] YARN
-   [x] db 클라우드 서비스 RDS사용
-   [x] 시퀄라이즈
-   [x] dotenv
-   [x] gitignore
-   [x] prettierrc
-   [x] nodemon
-   [x] Joi schema lib
-   [ ] SWAGGER API 명세서

## 2. 데이터베이스 연결

-   [x] MySQL, MySQL RDS 설치
-   [x] MySQL생성 및 연결
-   [x] models, migration 확인 테이블 생성

## 3. API 구현하기

-   [x] 회원가입 API
-   [x] 로그인 API
-   [x] 로그아웃 API
-   [x] 상품 생성 API
-   [x] 상품 수정 API
-   [x] 상품 삭제 API
-   [x] 상품 목록 API
-   [x] 상품 상세 API
-   [x] 인증 미들웨어

## 4. AWS 배포

-   [x] AWS EC2 배포
-   [x] PM2

<br>
<br>

# 🤔 더 고민해 보기

1. **암호화 방식**

-   비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 `단방향 암호화`와 `양방향 암호화` 중 어떤 암호화 방식에 해당할까요?

    1. 단방향 암호화 방식에 해당합니다

-   비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?
    1. 원본 데이터를 알아내기 힘들다 -> 암호화 가능
    2. 복호화가 불가능 하기 때문에 변조가 불가능하다.

2. **인증 방식**

-   JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?

    1. Access 유효기간이 끝날때 까지 서버에서 차단하거나 조치를 취할 수 없다.

-   해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?
    1. Access Token에 유효기간을 애초에 짧게 줌으로써 빠르게 권한을 만료 시킬 수 있다.

3. **인증과 인가**

-   인증과 인가가 무엇인지 각각 설명해 주세요.

    1. 인증은 사용자의 신원을 검증하는 행위로서 보안 프로세스에서 첫 번째 단계이다.
    2. 인가는 사용자에게 특정 리소스나 기능에 액세스 할 수 있는 권한을 부여하는 프로세스를 말한다.

-   과제에서 구현한 Middleware는 인증에 해당하나요? 인가에 해당하나요? 그 이유도 알려주세요.
    1. 인증에 해당합니다 왜냐하면 토큰의 검증을 할 뿐 액세스 권한 자체에 대한 허가를 담당하지 않기 때문입니다.

4. **Http Status Code**

-   과제를 진행하면서 `사용한 Http Status Code`를 모두 나열하고, 각각이 `의미하는 것`과 `어떤 상황에 사용`했는지 작성해 주세요.

    1. <span style="color: red">400</span> : 클라이언트가 잘못된 요청을 보냄
    2. <span style="color: red">401</span> : 요청자는 인증 되지 않아 수행할 수 없음을 표현
    3. <span style="color: red">404</span> : 클라리언트가 요청한 자원이 존재하지 않음
    4. <span style="color: red">500</span> : 서버 내부 문제 발생
    5. <span style="color: green">200</span> : 클라이언트의 요청을 서버가 정상적으로 처리
    6. <span style="color: green">201</span> : 클라이언트의 요청을 서버가 정상적으로 처리했고, 새로운 리소스가 생김

5. **리팩토링**

-   MongoDB, Mongoose를 이용해 구현되었던 코드를 MySQL, Sequelize로 변경하면서, 많은 코드 변경이 있었나요? 주로 어떤 코드에서 변경이 있었나요?

    1. 각각 지원하는 데이터 타입이 달랐습니다. MongoDB는 ObjectId와 같은 특정 데이터 타입을 지원하지만, MySQL은 지원하지 않을 수 잇었습니다 따라서 데이터 타입을 변경해야 합니다.
    2. 연결 및 설정: MongoDB 와 MySQL은 연결 및 설정 방법이 다를 수 있었다. 따라서 연결 및 설정 관련 코드를 변경해야 할 수 있었습니다.
    3. 쿼리문법이 달랐다 하지만 sequelize과 mongoose를 사용한다면 javascript 문법으로 사용할 수 있어서 편했습니다.

-   만약 이렇게 DB를 변경하는 경우가 또 발생했을 때, 코드 변경을 보다 쉽게 하려면 어떻게 코드를 작성하면 좋을 지 생각나는 방식이 있나요? 있다면 작성해 주세요.
    1. DB연결 시 코드를 갈아 끼워야 하는 부분들을 모듈화를 시켜 기존 코드에서 분리시키기 쉽도록 작업해 놓는다.

6. **서버 장애 복구**

-   현재는 PM2를 이용해 Express 서버의 구동이 종료 되었을 때에 Express 서버를 재실행 시켜 장애를 복구하고 있습니다. 만약 단순히 Express 서버가 종료 된 것이 아니라, AWS EC2 인스턴스(VM, 서버 컴퓨터)가 재시작 된다면, Express 서버는 재실행되지 않을 겁니다. AWS EC2 인스턴스가 재시작 된 후에도 자동으로 Express 서버를 실행할 수 있게 하려면 어떤 조치를 취해야 할까요?

    (Hint: PM2에서 제공하는 기능 중 하나입니다.)

    1. pm2 startup 명령어를 사용하여 PM2를 시스템 부팅 시 시작하도록 구성합니다.

    ```bash
    pm2 startup
    pm2 save
    ```

   위 명령어를 실행하면 PM2가 부팅 시 자동으로 시작되도록 설정됩니다.

7. **개발 환경**

-   nodemon은 어떤 역할을 하는 패키지이며, 사용했을 때 어떤 점이 달라졌나요?

-   npm을 이용해서 패키지를 설치하는 방법은 크게 일반, 글로벌(`--global, -g`), 개발용(`--save-dev, -D`)으로 3가지가 있습니다. 각각의 차이점을 설명하고, nodemon은 어떤 옵션으로 설치해야 될까요?
    1. Node.js 애플리케이션을 개발하는 동안 코드 변경 사항을 감지하고 자동으로 서버를 재시작 하는 도구입니다. nodemon을 사용하면 개발 중에 소스 코드를 수정하고 저장할 때마다 자동으로 서버가 다시 시작되므로 코드 변경 사항을 즉시 확인할 수 있습니다.
