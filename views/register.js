$(function () {
    // 监听表单提交事件
    $("form").on("submit", e => {
        e.preventDefault(); // 阻止默认表单提交行为

        const validation = validateForm(); // 验证表单数据
        if (!validation.isValid) return; // 如果验证不通过，终止提交

        registerUser(validation.data); // 如果验证通过，调用注册函数
    });

    // 验证表单数据的函数
    function validateForm() {
        const inputs = {
            username: $(".username").val(),
            password: $(".password").val(),
            rpassword: $(".rpassword").val(),
            nickname: $(".nickname").val(),
        };

        const { username, password, rpassword, nickname } = inputs;

        // 定义验证规则
        const usernamePattern = /^[a-z0-9]\w{3,11}$/;
        const passwordPattern = /\w{6,12}/;
        const nicknamePattern = /^[\u4e00-\u9fa5]{2,5}$/;

        let errorMessage;

        // 验证用户名
        if (!usernamePattern.test(username))
            errorMessage = "用户名格式错误，需为字母或数字且长度在4至12之间。";
        // 验证密码
        else if (!passwordPattern.test(password))
            errorMessage = "密码格式错误，需为6至12位的字母或数字。";
        // 验证两次输入的密码是否一致
        else if (password !== rpassword) 
            errorMessage = "两次输入的密码不一致。";
        // 验证昵称
        else if (!nicknamePattern.test(nickname))
            errorMessage = "昵称必须为2至5个中文字符。";

        // 如果有错误信息，显示错误并返回验证结果
        if (errorMessage) {
            showError(errorMessage);
            return { isValid: false };
        }

        // 如果验证通过，返回验证结果和表单数据
        return { isValid: true, data: { username, password, nickname, rpassword } };
    }

    // 显示错误信息的函数
    function showError(message) {
        $(".error").text(message).show();
    }

    // 注册用户的函数
    function registerUser(userData) {
        axios
            .post("http://localhost:9000/users/register", userData) // 发起POST请求注册用户
            .then(({ data }) => {
                if (data.code === 1) {
                    alert(`注册成功，即将跳转至登录页面...`);
                    window.location.href = "login.html"; // 注册成功，跳转至登录页面
                } else {
                    alert("注册失败，请稍后重试。"); // 注册失败，显示提示信息
                }
            })
            .catch(err => {
                console.error("注册请求出错:", err);
                alert("注册过程中遇到错误，请检查网络或稍后重试。"); // 请求出错，显示提示信息
            });
    }
});
