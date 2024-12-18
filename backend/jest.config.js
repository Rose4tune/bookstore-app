module.exports = {
  preset: "ts-jest", // TypeScript를 Jest에서 사용
  testEnvironment: "node", // Node.js 환경에서 테스트 실행
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // .ts, .tsx 파일을 ts-jest로 변환
  },
  moduleFileExtensions: ["ts", "js"], // 파일 확장자 설정
  testMatch: ["**/__tests__/**/*.test.ts"], // 테스트 파일 위치 패턴
};
