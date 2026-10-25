// ============================================================
//  솔담 빌리지 — 데이터 파일
//  엔진(index.html)은 건드리지 않고 이 파일만 고치면 됩니다.
//  모든 좌표는 "지도 원본 픽셀" 기준입니다. (0,0) = 지도 왼쪽 위.
//  아래 숫자는 지도를 가로 2000으로 줄여 놓고 잰 값이라 K를 곱해 원본 픽셀로 바꿉니다.
// ============================================================

const K = 2752 / 2000;
const at = (x, y) => ({ x: Math.round(x * K), y: Math.round(y * K) });
const box = (x, y, w, h) => ({ x: Math.round(x * K), y: Math.round(y * K), w: Math.round(w * K), h: Math.round(h * K) });

// 배경 지도 한 장. width/height = 이미지의 원본 픽셀 크기.
const MAP = { src: "map.png", width: 2752, height: 1536 };

// 방문자(플레이어). x,y = 발 위치. speed = 초당 이동 픽셀.
const PLAYER = { src: "sprites/player.png", ...at(1100, 600), speed: 150 };

// 마을 주민(에이전트). x,y = 발 위치(지도 픽셀). sprite 는 이미지 한 장.
// lines 는 여러 줄 넣을 수 있고, 말풍선을 누르면 다음 줄로 넘어갑니다.
const NPCS = [
  // ── 큰 작업실 앞 ──
  { id: "frank",    name: "프랭크",   sprite: "sprites/frank.png",    ...at(915, 490),
    lines: ["안녕, 나는 프랭크야. 나는 마을 총괄이야. 들어온 일을 알맞은 친구에게 맡기고 결과를 검수하고 있지."] },
  { id: "mac",      name: "맥",       sprite: "sprites/mac.png",      ...at(705, 485),
    lines: ["안녕, 나는 맥이야. 나는 시스템 엔지니어야. 컴퓨터랑 백업, 자동화가 잘 돌아가게 돌보고 있지."] },
  { id: "homerun",  name: "홈런",     sprite: "sprites/homerun.png",  ...at(1120, 485),
    lines: ["안녕, 나는 홈런이야. 나는 앱 개발자야. 작은 앱을 기획하고 만들고 있지."] },
  { id: "somun",    name: "소문",     sprite: "sprites/somun.png",    ...at(860, 715),
    lines: ["안녕, 나는 소문이야. 나는 마케팅 전략가야. 누구에게 어떻게 알릴지 정하고 카피를 쓰고 있지."] },

  // ── 검수단 셋 (녹음실과 작업실 사이 풀밭) ──
  { id: "baro",     name: "바로",     sprite: "sprites/baro.png",     ...at(380, 485),
    lines: ["안녕, 나는 바로야. 나는 검수단 첫째야. 고객의 눈으로 읽어 보고 있지."] },
  { id: "bitjang",  name: "빗장",     sprite: "sprites/bitjang.png",  ...at(450, 495),
    lines: ["안녕, 나는 빗장이야. 나는 검수단 둘째야. 새면 안 되는 정보와 지나친 약속을 막고 있지."] },
  { id: "nachim",   name: "나침",     sprite: "sprites/nachim.png",   ...at(520, 485),
    lines: ["안녕, 나는 나침이야. 나는 검수단 셋째야. 두 검수를 모아 결정 카드 한 장으로 정리하고 있지."] },

  // ── 오두막 셋 ──
  { id: "hana",     name: "하나",     sprite: "sprites/hana.png",     ...at(265, 420),
    lines: ["안녕, 나는 하나야. 나는 외국인을 위한 한국어 콘텐츠를 만들어. 쉬운 한국어를 짧은 영상으로 담고 있지."] },
  { id: "ernie",    name: "어니",     sprite: "sprites/ernie.png",    ...at(1430, 425),
    lines: ["안녕, 나는 어니야. 나는 영상 대본 작가야. 타자기 앞에서 이야기를 다듬고 있지."] },
  { id: "kal",      name: "칼",       sprite: "sprites/kal.png",      ...at(1795, 430),
    lines: ["안녕, 나는 칼이야. 나는 마음 탐구 친구야. 깊은 질문을 같이 들여다보고 있지."] },

  // ── 카페 ──
  { id: "leo",      name: "레오",     sprite: "sprites/leo.png",      ...at(240, 790),
    lines: ["안녕, 나는 레오야. 나는 한 주를 돌아보는 친구야. 아침에 쓴 글을 읽고 흐름을 짚고 있지."] },
  { id: "tosim",    name: "토심",     sprite: "sprites/tosim.png",    ...at(125, 930),
    lines: ["안녕, 나는 토심이야. 나는 부동산 분석가야. 매물과 시세를 꼼꼼히 보고 있지."] },

  // ── 텃밭과 꽃밭 ──
  { id: "pulssaem", name: "풀쌤",     sprite: "sprites/pulssaem.png", ...at(1640, 800),
    lines: ["안녕, 나는 풀쌤이야. 나는 토지 공부 파트너야. 땅 자료를 읽고 판단을 돕고 있지."] },
  { id: "randy",    name: "랜디",     sprite: "sprites/randy.png",    ...at(1200, 760),
    lines: ["안녕, 나는 랜디야. 나는 브랜드 디자이너야. 로고랑 배너, 캐릭터를 그리고 있지."] },

  // ── 갈림길 표지판 근처 ──
  { id: "fox",      name: "사막여우", sprite: "sprites/fox.png",      ...at(905, 875),
    lines: ["안녕, 나는 사막여우야. 나는 세컨드 브레인이야. 기록과 메모를 모아 두고 필요할 때 꺼내 주고 있지."] },
  { id: "hedgehog", name: "고슴도치", sprite: "sprites/hedgehog.png", ...at(960, 885),
    lines: ["안녕, 나는 고슴도치야. 나는 1인 사업 코치야. 장부와 계획을 같이 점검하고 있지."] },
  { id: "joy",      name: "조이",     sprite: "sprites/joy.png",      ...at(1040, 975),
    lines: ["안녕, 나는 조이야. 나는 영어 릴스를 만들어. 아는 단어로 말하는 하루 한 문장을 짓고 있지."] },
  { id: "ssaem",    name: "쌤",       sprite: "sprites/ssaem.png",    ...at(700, 985),
    lines: ["안녕, 나는 쌤이야. 나는 영어 과외 선생님이야. 학생들 수업과 숙제를 챙기고 있지."] },

  // ── 잔디밭 (쉬는 친구들) ──
  { id: "tim",      name: "팀",       sprite: "sprites/tim.png",      ...at(470, 800),
    lines: ["안녕, 나는 팀이야. 나는 영상 업로드 관리자야. 채널이 쉬는 동안 보드게임을 하고 있지."] },
  { id: "seth",     name: "세스",     sprite: "sprites/seth.png",     ...at(625, 800),
    lines: ["안녕, 나는 세스야. 나는 콘텐츠 기획자야. 다음 아이디어를 놀면서 모으고 있지."] },
  { id: "nil",      name: "닐",       sprite: "sprites/nil.png",      ...at(410, 690),
    lines: ["안녕, 나는 닐이야. 나는 채널 분석가야. 지금은 그래프 쿠션을 안고 쉬고 있지."] },
  { id: "jack",     name: "잭",       sprite: "sprites/jack.png",     ...at(690, 680),
    lines: ["안녕, 나는 잭이야. 나는 영어 튜터야. 이번엔 주인이 배우는 쪽이라 내가 가르치고 있지."] },
  { id: "flo",      name: "플로",     sprite: "sprites/flo.png",      ...at(545, 915),
    lines: ["안녕, 나는 플로야. 나는 건강 챙김 담당이야. 매일 몸 상태를 같이 기록하고 있지."] },
  { id: "dean",     name: "딘",       sprite: "sprites/dean.png",     ...at(830, 625),
    lines: ["안녕, 나는 딘이야. 나는 서류와 법률 정리 담당이야. 지금은 큰일을 마치고 쉬고 있지."] },
  { id: "kongtteok", name: "콩떡이",  sprite: "sprites/kongtteok.png", ...at(1000, 655),
    lines: ["멍! (꼬리를 살랑살랑)", "멍멍! (2.5kg 치와와, 마을 마스코트)"] },
];

// 못 지나가는 네모(건물·물·밭). x,y = 왼쪽 위, w,h = 크기. (가로 2000 기준으로 잰 값)
const BLOCKERS = [
  box(120, 0, 280, 360),     // 녹음 부스
  box(595, 0, 640, 430),     // 큰 작업실(데크 포함)
  box(1320, 40, 270, 345),   // 글방
  box(1660, 50, 270, 360),   // 해먹 오두막
  box(0, 520, 175, 330),     // 카페 건물
  box(1280, 610, 430, 145),  // 텃밭 윗줄
  box(1280, 740, 110, 150),  // 장미 화단
  box(1830, 630, 105, 120),  // 오른쪽 꽃밭
  box(1285, 940, 165, 176),  // 해바라기 화단
  box(1465, 815, 380, 260),  // 연못
  box(995, 730, 30, 150),    // 표지판 기둥
  box(0, 1010, 990, 40),     // 아래 울타리
  box(0, 0, 2000, 70),       // 맨 위 울타리·나무
];
