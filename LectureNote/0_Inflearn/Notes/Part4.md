# Part 4

## 미니 프로젝트

### Step 0. 프로젝트 소개

- 버튼을 클릭하면, 블로그의 글을 `ajax`로 가져온다. 불러온 정보들은 `<a>` 태그로 만들어져있어, 클릭하면 이동하도록 한다.
- 각각의 글에는 `찜하기` 버튼이 있다. 클릭하면 하단의 `내 찜 목록` 에서 볼 수 있다.

### Step 1.

1. `npm install` 하여 필요한 모듈을 설치했다.

   - `package.json` 에 기록되며, 보다 상세한 의존성은 `package-lock.json` 에 기록된다.
   - `webpack` 을 설치했다. (추후에 import, export를 사용해야 하기 때문)

2. `webpack` 을 설정하였다.
   - 설정에 관한 내용은 `webpack.config.js` 파일에 기록한다.
   - `entry`: 빌드할 코드
   - `output`: 빌드한 코드의 결과물
   - `module`
     - `rules`: 의존관계를 분석할 때 추가적인 rule이 있다면 적는 부분
