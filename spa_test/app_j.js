$(document).ready(function() {
    const menuItems = [
        { id: 'home',        label: 'Home' },
        { id: 'client',      label: 'Client' },
        { id: 'account',     label: 'Account' },
        { id: 'transaction', label: 'Transaction' },
        { id: 'marketing',   label: 'Marketing' },
        { id: 'partner',     label: 'Partner' },
        { id: 'log',         label: 'Log' }
    ];

    const $menuList = $('#menuList');
    const $content  = $('#main');

    if ($menuList.length) {
        // 메뉴 아이템 생성 및 이벤트 처리
        menuItems.forEach(item => {
            const $li = $('<li>');
            const $a  = $('<a>').attr('href', `#${item.id}`).text(item.label);

            $a.on('click', function(event) {
                event.preventDefault(); // 기본 동작(페이지 이동) 방지
                navigateTo(item.id);
            });

            $li.append($a);
            $menuList.append($li);
        });
    } else {
        console.error("menuList element not found.");
    }

    // 초기 홈 페이지 로드
    navigateTo('home');

    function navigateTo(pageId) {
        // 페이지 파일 경로 설정 (예: pages 폴더에 각 페이지의 HTML 파일이 위치한다고 가정)
        const pageFilePath = `pages/${pageId}.html`;

        // jQuery를 사용하여 페이지 내용 로드
        $.ajax({
            url: pageFilePath,
            method: 'GET',
            success: function(data) {
                $content.html(data);
            },
            error: function(jqXHR) {
                console.error(`Error loading ${pageFilePath}:`, jqXHR);
                $content.html(`<p>Error loading page content.</p>`);
            }
        });
    }
});
