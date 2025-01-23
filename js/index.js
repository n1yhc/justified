function login() {
    const nickname = document.getElementById('nickname').value;
    const birth = document.getElementById('birth').value;
  
    if (nickname === '' || birth === '' || birth.length !== 6 || isNaN(birth)) {
      alert('닉네임과 생년월일(YYMMDD)을 정확히 입력해주세요.');
      return;
    }
  
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('birth', birth);
    window.location.href = '2-college.html';
  }
  