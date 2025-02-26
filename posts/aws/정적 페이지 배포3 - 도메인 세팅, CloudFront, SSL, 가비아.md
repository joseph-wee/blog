---
title: 정적 페이지 배포3 - 도메인 세팅, CloudFront, SSL, 가비아
date: 2025-02-21
---
## 개요

- 구입한 도메인, SSL인증서, CloudFront를 연결해보자.
	1. 가비아 도메인 레코드 설정
	2. SSL 인증서 발급
	3. CloudFront, 도메인, SSL 인증서 연결


## 가비아 도메인 레코드 설정

- 가비아에서 원하는 도메인을 구매한다.
- 구매 후 DNS 설정으로 이동한다.
	- My가비아 -> DNS관리툴 -> 설정 클릭
	- 아래와 같이 바로 안뜨면 조금 기다려보자. 

![](images/awsDeployStatic%2040.png)

- 레코드 수정 클릭

![](images/awsDeployStatic%2032.png)


- 타입 : CNAME
- 호스트 : @
	- 가비아에서는 호스트 이름이 없을 경우 @ 를 입력하는데 CloudFront 주소는 호스트 이름이 없기 때문
- 값/위치 : CloudFront 주소 - `https://` 붙이면 안되고 맨 뒤에 `.` 입력


![](images/awsDeployStatic%2033.png)

## SSL 인증서 발급

- ACM(AWS Certificate Manager)으로 이동
	- certifacte manager 검색하면 나온다.
- 리전을 미국 버지니아 북부로 세팅
	- 나머지 리전에서는 SSL 인증서가 발급이 불가, 만약 이를 원치않는다면 다른 SSL인증 발급을 알아봐야할 듯 싶다.
- 요청 클릭

![](images/awsDeployStatic%2034.png)


- 다음 클릭


![](images/awsDeployStatic%2035.png)

- 완전히 정규화된 도메인 이름 : 웹 사이트 주소
- 이 인증서에 다른 이름 추가 : 웹 사이트 주소의 다른이름
	- 정규화된 도메인 이름에 `www.excample.com` 를 입력하고 다른 이름 추가에 `example.com` 을 입력한다면 사용자는 `example.com` 으로 접근해도 `www.example.com` 사이트에 접근할 수 있게 된다.

![](images/awsDeployStatic%2043.png)


- 아래와 같이 뜰텐데 상태가 아직 발급이 아닐 것이다.
	- 나의 경우 도메인 순서가 다른데 이는 정규화된 도메인 이름에 www를 안붙이고 다른 이름에 www를 붙여서 그런것이다. 그런데 이렇게 하니 `www.josephlog.info` 로 접속해도 `josephlog.info` 로 접속이 안된다. 반대로 하는게 좋을 것 같다.
- 이제 가비아로 이동하여 CNAME 이름, 값을 등록해주면 된다.

![](images/awsDeployStatic%2037.png)

- 타입 : CNAME
- 호스트 : CNAME 이름 - 뒤에 `.` 과 도메인 주소를 빼야한다. 
- 값/위치 : CNAME 값
- 저장 클릭


![](images/awsDeployStatic%2038.png)


- 시간이 흐르면 아래와 같이 상태가 성공으로 바뀔 것이다. 나의 경우 30분뒤에 확인해보니 바뀌어 있었다.


![](images/awsDeployStatic%2037.png)


## CloudFront, 도메인, SSL 인증서 연결

- CloudFront로 이동
- 편집 클릭


![](images/awsDeployStatic%2044.png)

- 도메인 이름 입력
- 발급 받은 SSL 인증서 선택

![](images/awsDeployStatic%2039.png)

- 이제 도메인으로 접속해보면 된다.
	- 안되면 조금 기다려보자. 1분정도 기다리니 되었다.


![](images/awsDeployStatic%2045.png)