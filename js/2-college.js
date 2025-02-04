let selectedProduct = null;
let selectedProductName = ""; // ✅ 상품 이름 저장 변수

// 상품별 가격 설정
const productPrices = {
  1: 60, // 교수님 음소거권
  2: 180, // 에이쁠 보장권
  3: 20, // 질문금지권
  4: 20, // 질문금지 방어권
  5: 30, // 예약도서 패스권
  6: 20,  // 무단결석권
  7: 50,  // 강의중 이불취침권
  8: 8,  // 유고결석권
  9: 50,  // 수업시간 단축권
  10: 35,  // 지각제출 방어권
  11: 120,  // 팀플 무임승차권
  12: 200,  // 수업강탈권
};

window.onload = function () {
  const birth = localStorage.getItem("birth");
  const nickname = localStorage.getItem("nickname");

  if (!birth || !nickname) {
    alert("생년월일이나 닉네임 정보가 없습니다.");
    return;
  }

  let sum = 0;
  for (let i = 0; i < birth.length; i++) {
    const digit = parseInt(birth.charAt(i));
    if (!isNaN(digit)) {
      sum += digit;
    }
  }

  const cash = sum * 10;
  localStorage.setItem("cash", cash);

  const cashElement = document.getElementById("cash");
  const nicknameElement = document.getElementById("nickname");

  if (cashElement && nicknameElement) {
    cashElement.innerText = cash;
    nicknameElement.innerText = `${nickname} 님`;
  }

  // ✅ 저장된 구매내역 불러오기
  const savedHistory = JSON.parse(localStorage.getItem("purchaseHistory")) || [];
  const historyBox = document.getElementById("purchase-history");

  savedHistory.forEach((item) => {
    const historyItem = document.createElement("p");
    historyItem.innerText = item;

    // ✅ 현재 사용자 닉네임 확인 후 클래스 적용
    if (item.includes(nickname)) {
      historyItem.classList.add("current-user-log");
    }

    historyItem.style.margin = "0";
    historyBox.appendChild(historyItem);
  });
};

/* ✅ 팝업 열기 (상품 번호 + 상품 이름 받기) */
function showPopup(productNumber, productName) {
  selectedProduct = productNumber;
  selectedProductName = productName; // ✅ 상품 이름 저장

  const popupDesc = document.getElementById("popup-description");
  const popup = document.getElementById("popup");

  if (popupDesc && popup) {
    popupDesc.innerText = `"${productName}" 을 구매하시겠습니까?`;
    popup.style.display = "block";
  } else {
    console.error("팝업 요소를 찾을 수 없습니다.");
  }
}

/* ✅ 팝업 닫기 */
function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) {
    popup.style.display = "none";
  }
}

/* ✅ 구매 처리 */
function purchase() {
  let cash = parseInt(localStorage.getItem("cash"));

  if (isNaN(cash)) {
    alert("캐시 정보가 없습니다.");
    return;
  }

  // 상품 가격 가져오기
  const price = productPrices[selectedProduct];
  if (!price) {
    alert("잘못된 상품 선택입니다.");
    return;
  }

  if (cash >= price) {
    cash -= price;
    localStorage.setItem("cash", cash);

    const cashElement = document.getElementById("cash");
    if (cashElement) {
      cashElement.innerText = cash;
    }

    const nickname = localStorage.getItem("nickname") || "사용자";

    // ✅ 구매내역에 상품 이름 출력
    addPurchaseHistory(`${nickname}님이 "${selectedProductName}" (${price}R)을(를) 구매했습니다!`);

    alert(`"${selectedProductName}"을(를) 성공적으로 구매했습니다!`);
  } else {
    alert("캐시가 부족합니다!");
  }
  closePopup();
}

/* ✅ 구매내역 추가 함수 */
function addPurchaseHistory(message) {
  const historyBox = document.getElementById("purchase-history");
  const currentNickname = localStorage.getItem("nickname");

  // ✅ 기존 구매내역 불러오기
  let history = JSON.parse(localStorage.getItem("purchaseHistory")) || [];

  // ✅ 새 구매내역 추가
  history.push(message);

  // ✅ localStorage에 저장
  localStorage.setItem("purchaseHistory", JSON.stringify(history));

  // ✅ 화면에 추가
  const newHistoryItem = document.createElement("p");
  newHistoryItem.innerText = message;

  // ✅ 현재 사용자의 구매라면 클래스 추가
  if (message.includes(currentNickname)) {
    newHistoryItem.classList.add("current-user-log");
  }

  newHistoryItem.style.margin = "0";
  historyBox.appendChild(newHistoryItem);
}
