---
title: 정적 페이지 배포1 - S3, Next.js, pnpm
date: 2025-02-21
---
## 개요

- S3를 이용하여 버킷생성 후 정적 페이지를 업로드하여 웹 호스팅을 해보자.
- 정적 페이지는 Next.js의 static export, pnpm을 이용하여 빌드하여 준비하였다. 순서는 아래와 같다.
	1. 기본 개념 정리
	2. 버킷 생성
	3. 버킷 환경 설정
	4. 정적 페이지 파일 업로드 - 수동
	5. 정적 페이지 파일 업로드 - 깃허브 액션

## 개념 정리

### S3

-  **스토리지 서비스**로 다양한 목적에 맞게 데이터를 저장하고 보호 할 수 있으며 데이터 엑세스에 대한 관리를 제공한다. 
- [공식문서](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/Welcome.html)

### 버킷

- S3에 저장된 객체에 대한 저장된 객체에 대한 컨테이너이다.
- 버킷 하나당 하나의 저장소라고 보면 된다.
- 버킷에 대한 엑세스 제어, 버전 관리, 웹 호스팅등 다양한 기능을 제공한다.
- [공식문서](https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/UsingBucket.html)



## 버킷 생성

- 생성하고자 하는 버킷의 리전 선택


![](images/screenCapture%202025-02-21%2019.13.41.png)

- s3로 이동하여 버킷 만들기 클릭

![](images/screenCapture%202025-02-21%2018.13.57.png)


- 버킷 이름 입력 (버킷 이름 규칙에 맞게 아래 클릭하면 나온다.)
	- 버킷 이름은 노출안하는게 좋다. 여기서 등장하는 버킷들은 모두 삭제할 예정


![](images/screenCapture%202025-02-21%2018.14.29.png)

- 퍼블릭 엑세스 차단 해제
	- 지금은 s3만을 이용해 웹 호스팅을 할 것이기에 차단 해제해 놓는다. 나중에 cloudfront를 연동하면 퍼블릭 엑세스를 차단할 것이다.

![](images/screenCapture%202025-02-21%2018.17.26.png)

- 버킷 만들기 클릭

![](images/screenCapture%202025-02-21%2018.16.46.png)

- 아래와 같이 버킷이 생성되면 성공

![](images/screenCapture%202025-02-21%2018.59.27.png)

## 버킷 환경 설정

- 해당 버킷으로 이동 후 권한 클릭

![](images/screenCapture%202025-02-21%2018.59.45.png)

- 버킷 정책 편집 클릭

![](images/screenCapture%202025-02-21%2019.00.46.png)


- 버킷 정책을 삽입 후 저장
	- 버킷에 올라갈 파일에 접근이 가능하게 해주는 정책이다. 지금은 
	- Resource부분은 버킷 arn복사하여 붙여넣으면 된다. 뒤에 `/*` 도 들어가야 한다.

![](images/screenCapture%202025-02-21%2019.01.40.png)


- 버킷 정책 코드

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::test-bucket1231231264/*"
        }
    ]
}
```

- 속성으로 이동

![](images/screenCapture%202025-02-21%2019.02.28.png)

- 하단 정적 웹 사이트 호스팅 편집 클릭

![](images/screenCapture%202025-02-21%2019.02.41.png)

- 정적 웹 사이트 호스팅 활성화 체크
- 업로드할 정적 페이지의 메인 페이지 파일 이름을 입력 - 작성자는 `index.html` 이라 이를 입력함

![](images/screenCapture%202025-02-21%2019.03.20.png)

- 저장 클릭

![](images/screenCapture%202025-02-21%2019.03.29.png)
- 아래와 같이 되면 성공

![](images/screenCapture%202025-02-21%2019.05.30.png)

## 버킷 정적 페이지 파일 업로드 (수동)

- 이제 정적 웹 사이트 호스팅을 위한 설정은 끝났고 정적 페이지를 업로드 해보자.
- 버킷 객체로 이동, 업로드 버튼 클릭


![](images/screenCapture%202025-02-21%2019.03.48.png)


- 배포하고자 하는 정적 페이지 파일을 업로드후 업로드 버튼 클릭
	- 이 때, 빌드 결과물이 있는 디렉토리를 업로드를 하는 것이 아닌 아래와 같이 파일들을 모두 선택하여 업로드 하여야 한다. 기본 페이지를 루트 경로에서 찾는데 /index.html 가 존재 하지 않기에 웹 호스팅이 올바르게 이루어지지 않는다.


![](images/screenCapture%202025-02-21%2019.04.18.png)
![](images/screenCapture%202025-02-21%2019.04.24%201.png)


- 완료 후 속성으로 이동

![](images/screenCapture%202025-02-21%2019.02.28.png)

- 하단 정적 웹 사이트 호스팅의 엔드포인트 클릭

![](images/screenCapture%202025-02-21%2019.05.30%202.png)

- 아래와 같이 뜨면 성공 (바로 안될경우 조금 기다려보자. 1분안걸렸다.)

![](images/screenCapture%202025-02-21%2019.05.43.png)


## 버킷 정적 페이지 파일 업로드 (깃허브 액션)

- s3에 접근 할 수 있는 엑세스 키를 발급 받아 이를 이용하여 깃허브 액션을 통해 업로드를 해보자.
- 루트 계정이 아닌 iam 사용자를 생성하여 엑세스 키를 발급 받을것이다.
	- 루트 계정의 엑세스키를 발급받으면 노출되었을 경우 aws의 모든 서비스에 접근이 가능하여 보안상 위험하다. 또한 지금은 루트계정에서 s3 서비스를 이용했지만 원래는 사용자계정을 생성하여 해당 사용자계정으로 s3 서비스를 이용하는 것이 좋다.

### 사용자 생성 및 엑세스키 발급

- 보안 자격 증명으로 이동

![](images/screenCapture%202025-02-21%2020.55.17.png)

- 사용자 클릭

![](images/screenCapture%202025-02-21%2021.13.21.png)
- 사용자 생성 클릭


![](images/screenCapture%202025-02-21%2021.13.30.png)

- 사용자 이름 입력 및 다음 클릭

![](images/screenCapture%202025-02-21%2021.14.35.png)

- 그룹을 만들지 않을 것이기에 직접 정책 연결

![](images/screenCapture%202025-02-21%2021.14.58.png)


- s3 검색하여 AmazonS3FullAccess 정책을 선택한다.
	- s3에 대한 모든 접근관련 정책이다.

![](images/screenCapture%202025-02-21%2021.15.12.png)


- 내용 확인 후 사용자 생성 클릭

![](images/screenCapture%202025-02-21%2021.15.27.png)


- 만든 사용자로 이동하여 엑세스 키 만들기 클릭


![](images/screenCapture%202025-02-21%2021.16.08.png)

- 깃허브에서 사용하는 거라 서드 파티 서비스를 선택
	- 아무거나 선택해도 발급받는데 지장 없다.
	- 임시 보안 인증 IAM 역할을 사용하는게 좋다고 한다. 나는 장기간 사용할 예정이고 큰 문제가 될 것 같지 않아 무시하고 진행하였다.

![](images/screenCapture%202025-02-21%2021.16.18.png)

![](images/screenCapture%202025-02-21%2021.17.05.png)

- 발급 받은 엑세스 키, 비밀 엑세스 키 저장하기 (노출 안되게 조심하자)

![](images/screenCapture%202025-02-21%2021.17.21.png)


### 엑세스 키 등록

- 보안을 위해 깃허브 레포에 엑세스 키를 등록해야 한다.
- 깃허브 레포로 이동하여 new repositroy secret 클릭

![](images/screenCapture%202025-02-21%2021.22.08.png)


- 다음과 같이 Name, Secret 입력
	- Name : `AWS_ACCESS_KEY_ID`  Secret : 엑세스 키
	- Name : `AWS_SECRET_ACCESS_KEY` Secret : 비밀 엑세스 키
	- 각 Name은 github action 코드에서 변수로 사용된다.


### 깃허브 액션 워크 플로우 생성

- Github Actions란 빌드, 테스트 및 배포 파이프라인을 자동화 할 수 있는 CI/CD플랫폼이다. [공식문서](https://docs.github.com/ko/actions/about-github-actions/understanding-github-actions)
- 아래는 깃허브 워크 플로우이다. 나의 경우에는 next.js의 static export를 활성화해놓고 빌드할때 pnpm을 사용하고 싶었기에 아래와 같이 작성되었다.
- 내용을 요약하자면 develop 브랜치에 push가 되면 이를 감지하여 아래 워크 플로우가 실행된다.

```yml
name: deploy  # 워크플로우 이름 지정
on:
  push:
    branches:
      - develop  # develop 브랜치에 푸시될 때 실행

jobs:
  build:
    runs-on: ubuntu-20.04  # GitHub 액션 실행 환경 지정
    steps:
      - name: Checkout source code.
        uses: actions/checkout@v4  # 저장소의 소스 코드 체크아웃

      - name: Setup node.js
        uses: actions/setup-node@v4  # Node.js 설정
        with:
          node-version: "20.18.1"  # 사용할 Node.js 버전 지정

      - name: Install pnpm
        run: npm install -g pnpm  # pnpm 패키지 매니저 전역 설치

      - uses: actions/cache@v4  # 캐시 설정을 통해 의존성 설치 속도 향상
        id: cache
        with:
          path: |
            node_modules  # Node.js 의존성 저장 경로
            .pnpm-store   # pnpm의 저장소 캐시 경로
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}  # 캐시 키 설정
          restore-keys: |
            ${{ runner.os }}-pnpm-store-

      - name: Install dependencies
        run: pnpm install  # 프로젝트 의존성 설치

      - name: Build
        run: pnpm run build  # 프로젝트 빌드 실행

      - name: Sync Bucket
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}  # AWS 액세스 키 환경 변수 설정
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}  # AWS 시크릿 키 설정
          AWS_EC2_METADATA_DISABLED: true  # EC2 메타데이터 접근 비활성화
        run: |
          aws s3 sync \ # 업데이트된 파일만 복사하여 업로드, 만약 sync 대신 cp를 쓰면 모든 파일을 복사하여 업로드한다.
            --region us-east-1 \
            out s3://test-bucket1231231264 \ # 버킷 이름
            --delete  # S3 버킷과 로컬 'out' 디렉토리 동기화 (삭제된 파일 반영)


```

### 결과

- 아래와 같이 결과가 나오면 성공, 안되면 로그를 확인해보자.

![](images/screenCapture%202025-02-23%2018.36.59.png)