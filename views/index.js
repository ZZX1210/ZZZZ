$(function () {
    // 初始化页面
    initPage();
});

function initPage() {
    // 显示用户登录状态
    showOnOff();
    // 显示用户昵称
    showUser();
    // 获取并显示轮播图
    getCarousel();
    // 设置注销功能
    setupLogout();
    // 设置导航到个人中心页面的功能
    setupSelfPageNavigation();
}

function setupLogout() {
    // 设置点击注销按钮的事件处理
    $(".logout").click(function () {
        // 获取用户ID和token
        const userId = sessionStorage.getItem("id");
        const token = sessionStorage.getItem("token");
        // 调用注销函数
        logout(userId, token);
    });
}

function setupSelfPageNavigation() {
    // 设置点击个人中心按钮的事件处理
    $(".self").click(function () {
        // 导航到个人中心页面
        redirectToSelfPage();
    });
}

function logout(userId, token) {
    // 发起GET请求注销用户
    axios.get(`http://localhost:9000/users/logout?id=${userId}`, {
        headers: {
            Authorization: token,
        },
    })
    .then(logoutResponse => {
        // 如果注销成功，清除会话存储并跳转到首页
        if (logoutResponse.data.code === 1) {
            clearSessionStorage();
            redirectToIndexPage();
        }
    });
}

function clearSessionStorage() {
    // 清除所有会话存储的数据
    sessionStorage.clear();
}

function redirectToIndexPage() {
    // 跳转到首页
    window.location.href = "./index.html";
}

function redirectToSelfPage() {
    // 跳转到个人中心页面
    window.location.href = "./self.html";
}

function getCarousel() {
    // 发起GET请求获取轮播图列表
    axios.get("http://localhost:9000/carousel/list")
    .then(response => {
        // 生成轮播图的HTML
        const images = response.data.list
            .map(item => `<div><img src="http://localhost:9000/${item.name}" /></div>`)
            .join("");
        const carouselHtml = `<div carousel-item>${images}</div>`;

        // 将轮播图HTML插入页面
        $("#carousel").html(carouselHtml);
        // 初始化轮播图
        setupCarousel();
    });
}

function setupCarousel() {
    // 使用layui初始化轮播图
    layui.carousel.render({
        elem: "#carousel",
        width: "1200px",
        height: "600px",
        arrow: "hover",
        anim: "fade",
    });
}

function showUser() {
    // 从sessionStorage中获取用户昵称
    const nickname = sessionStorage.getItem("nickname");
    if (nickname) {
        // 显示用户昵称
        $(".nickname").text(nickname);
    }
}

function showOnOff() {
    // 从sessionStorage中获取用户昵称
    const nickname = sessionStorage.getItem("nickname");
    if (nickname) {
        // 如果用户已登录，显示登录状态
        $(".on").addClass("active").siblings().removeClass("active");
    } else {
        // 如果用户未登录，显示未登录状态
        $(".off").addClass("active").siblings().removeClass("active");
    }
}
