document.addEventListener("DOMContentLoaded", function() {
    const menuList = document.getElementById('menuList');
    const content  = document.getElementById('main');

    if (menuList) {
        // 메뉴 아이템 생성 및 이벤트 처리
        menuItems.forEach(item => {
            const li = document.createElement('li');
            const a  = document.createElement('a');
            a.href = `#${item.id}`;
            a.textContent = item.label;
            a.addEventListener('click', function(event) {
                event.preventDefault(); // 기본 동작(페이지 이동) 방지
                navigateTo(item.id);
            });
            li.appendChild(a);
            menuList.appendChild(li);
        });
    } else {
        console.error("menuList element not found.");
    }

    // 초기 홈 페이지 로드
    navigateTo('home');

    function navigateTo(pageId) {
        // 페이지 파일 경로 설정 (예: pages 폴더에 각 페이지의 HTML 파일이 위치한다고 가정)
        const pageFilePath = `pages/${pageId}.html`;

        // AJAX를 사용하여 페이지 내용 로드
        fetch(pageFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                content.innerHTML = data;
            })
            .catch(error => {
                console.error(`Error loading ${pageFilePath}:`, error);
                content.innerHTML = `<p>Error loading page content.</p>`;
            });
    }
});
