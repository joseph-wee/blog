---
title: 정적 페이지 배포2 - S3, CloudFront연결
date: 2025-02-21
description: S3를 통해 배포한 정적 페이지를 CloudFront랑 연결해보자.
---
## 개요

- S3를 통해 배포한 웹 페이지를 CloudFront랑 연결해보자.
	1. 개념 정리
	2. CloudFront 생성
	3. S3 버킷 정책 업데이트


## 개념 정리

### CloudFront

- .html, css, js 및 이미지 파일과 같은 정적 및 동적 웹 컨텐츠를 사용자에게 더 빨리 배포하도록 지원하는 웹 서비스이다.
- 엣지 로케이션이라고 하는 데이터 센터의 전 세계 네트워크를 통해 컨텐츠를 제공한다.
- 컨텐츠를 요청하면 지연시간이 가장 낮은 엣지 로케이션으로 요청이 라우팅되어 가능한 최고의 성능으로 컨텐츠가 제공된다.

### S3와 CloudFront를 연결하는 이유

- 보안 및 성능 때문이다.
- S3의 버킷이름은 노출되지 않는편이 좋다. 해당 버킷으로 접근을 시도할 수 있기 때문이다. 또한 퍼블릭 엑세스를 허용하고 버킷에 대한 권한을 취득한다면 제3자가 나의 버킷을 마음껏 사용할 수 있기에 많은 청구요금을 받을 수 있다.
- 따라서 S3와 CloudFront를 연결하고 버킷에 직접 엑세스하는것이 아닌 CloudFront를 통해서만 접근할 수 있도록 하고 퍼블릭엑세스를 차단하는것이 좋다.

## CloudFront 생성


- CloudFront로 이동

![](images/awsDeployStatic.png)



- Origin Domain - 연결하고자 하는 버킷을 선택
- 이름 - 버킷 선택시 자동으로 채워짐
- 원본 엑세스 - 원본 엑세스 제어 설정(권장) 체크
	- 버킷에 CloudFront를 통해서만 접근할 수 있도록 하기 위해
- Create new OAC 버튼 클릭



![](images/awsDeployStatic%202.png)

- OAC란 OAI보다 강화된 S3 오리진을 보호하는 새로운 기능이다. ([AWS Blog](https://aws.amazon.com/ko/blogs/korea/amazon-cloudfront-introduces-origin-access-control-oac/) 참고)
- 이름 - 자동으로 입력됨
- 서명 동작 - 자동으로 체크

![](images/awsDeployStatic%203.png)


- Origin Shield란 CloudFront 캐싱 인프라의 추가 계층으로 오리진의 부하를 최소화하고 가용성을 높이며 운영 비용을 절감하는데 도움이 된다. -> 향상된 캐시 적중률, 오리진 부하 감소, 향상된 네트워크 성능 ([공식문서](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html) 참고)
- 그렇다고 항상 좋은 것은 아니다. 서비스 이용자가 국내와 아시아 수준에 머문다면 불필요 할 수도 있다. (https://issuebombom.tistory.com/110 참고)
- 따라서 본인 목적에 맞게 설정하면 될 것 같다.

![](images/awsDeployStatic%204.png)


- 자동으로 객체 압축이란 버킷에 올라가있는 파일을 자동으로 압축 객체를 제공해줄 수 있는 기능이다. 원래 제공하려는 크기보다 작아지기에 다운로드 속도가 빨라지면서 js, css의 경우 사용자에게 표시되는 웹 페이지의 렌더링 속도가 빨라지며 비용 또한 감소한다. ([공식문서](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/ServingCompressedFiles.html) 참고)
- 자동으로 객체 압축 - 기능 켜주자.
- 뷰어 프로토콜 정책 - Redirect HTTP to HTTPS 체크
	- http로 들어오면 https로 리다이렉트 될 수 있게
- 나머지는 그대로 둔다.

![](images/awsDeployStatic%205.png)


- 보호기능이 필요하면 키자. 1천만 건에 대해 14$라고하니 켜두어도 큰 금액이 부과될것 같지 않지만 나의 경우에는 비활성화를 택했다.

![](images/awsDeployStatic%206.png)

- 가격 분류 - 목적에 맞게 체크
	- 나의 경우에는 북미, 유럽, 아시아, 중동 및 아프리카 사용을 택했다.
- 기본값 루트 객체 - 업로드한 정적 페이지의 홈 페이지 파일 이름을 입력한다.
- 나머지는 그대로 둔다.


![](images/awsDeployStatic%2025.png)

- 로그 전송 - 로그 확인 하고싶으면 켜기
- 배포 생성 클릭


![](images/awsDeployStatic%2019.png)


## S3 버킷 정책 업데이트

- CloudFront 생성이 완료되면 아래와 같이 된다.
- 버킷에 CloudFront를 통해서만 접근할 수 있도록 버킷 정책을 업데이트 해야한다.
- 정책 복사 클릭
- S3 버킷 권한으로 이동


![](images/awsDeployStatic%2020.png)


- 편집 클릭


![](images/awsDeployStatic%2021.png)

- 기존 정책을 삭제하고 붙여넣기하여 변경사항 저장

![](images/awsDeployStatic%2022.png)


- 앞으로 CloudFront를 통해서만 버킷에 접근 할 수 있도록 퍼블릭 엑세스를 차단해야한다.
- 편집 클릭

![](images/awsDeployStatic%2026.png)

- 모든 퍼블릭 엑세스 차단 체크

![](images/awsDeployStatic%2027.png)

- 생성한 CloudFront로 이동
- 배포 도메인 이름을 복사

![](images/awsDeployStatic%2028.png)

- 주소창에 붙여넣는다. 아래와 같이 되면 성공.
- 만약 안될경우 앞에 `https://` 붙여서 입력해보자.

![](images/awsDeployStatic%2029.png)