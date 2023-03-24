> ## 프로젝트 이름

### [Url Shortener](https://shortener.shop/)

<img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e4c4842a-ff81-4ec2-89fa-641351bb4bd0/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230324%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230324T093053Z&X-Amz-Expires=86400&X-Amz-Signature=8135da952fb87e9c7e41d7108c05fa0ccb35072b6dc69b54cc015d951ed1e22d&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22Untitled.png%22&x-id=GetObject" width=300>

<br>
<br>

> ## 프로젝트 소개

-   기존에 Bit.ly, Url.kr와 같이 Base62기반으로 긴 URI를 7자로 줄여주는 서비스 Copy입니다.
-   Google Recaptcha V2로 매크로 방지 기능을 적용하였습니다.

    <br>
    <br>

> ## 기술 스택

-   NestJS / NodeJS
-   Typescript / Javascript
-   MikroORM
-   AWS EC2 / RDS / Route53

<br>
<br>

> ## 구현 기능

### [압축 기능]

-   [Bit.ly, Url.kr과 같은 Url 압축 Base62 기반으로 7자 이내로 압축 할 수 있음]()

### [매크로 방지 기능]

-   [Google Recaptcha V2 Guard 적용]()

### [검증, 핸들링 메소드 적용]

-   [NestJS Request Life Cycle에 따른 검증, 핸들링 메소드 적용(Logger, Null Interceptor, Exception Filter 등)]()

<br>
<br>

> ## 구현 예정 기능

-   링크별 통계 기능
-   링크 변환시 로딩바
-   QR 코드 기능

<br>
<br>

##

<details>
<summary>기타 리팩토링 예정 목록 (개발용)</summary>

-   [x] 도메인 적용 (Route53)
-   [x] EC2, RDS(mysql) 연결
-   [x] HTTP -> HTTPS 리다이렉트 (로드밸런서)
-   [ ] 자주 사용되는 URL 캐시 (Redis)
-   [ ] 테스트 코드 작성
-   [ ] Swagger 적용
-   [ ] Top, Nav
-   [ ] Next.JS 리팩토링
</details>
