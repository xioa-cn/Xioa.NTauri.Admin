<script setup lang="ts">
import  usePostMessage  from '@/ntauri/usePostMessage'
import useLogin from '@/hooks/useLogin';
import { useGenerateNumericCode } from '@/hooks/usegenerateNumericCode';
import { onMounted } from 'vue';
import { useMessage } from 'naive-ui';
import { useRegister } from '@/hooks/useRegister';
const {codeImage,refreshCode,validateCode} = useGenerateNumericCode();
onMounted(()=>{
    refreshCode();
})
const message = useMessage();
const {registerParams,code,registerUser} = useRegister();
const register = ()=>{
   if(validateCode(code.value)) {
    if(registerUser()){
        toggleForm();  
        code.value = '';
    }
    refreshCode();
   }else{
    message.error('验证码错误');
   }
}

const {loginParams,login,isLogin} = useLogin();

const toggleForm = () => {
    isLogin.value = !isLogin.value;
}

const closeApplication = () => {
    usePostMessage('closeWindow',null);
}

</script>

<template>
   <div class="login-box">
            <div class="login-left" :class="{ 'register-mode': !isLogin }">
                <div class="form-container">
                    <template v-if="isLogin">
                        <h2>登录</h2>
                        <div class="form-group">
                            <input v-model="loginParams.username" type="text" placeholder="用户名/邮箱/手机号" class="input-field" />
                        </div>
                        <div class="form-group">
                            <input v-model="loginParams.password" type="password" placeholder="密码" class="input-field" />
                        </div>
                        <div class="form-footer">
                            <a href="#" class="forgot-password">修改密码?</a>
                        </div>
                        <button class="login-button" @click="login">登录</button>
                    </template>
                    <template v-else>
                        <h2>注册</h2>
                        <div class="form-group">
                            <input v-model="registerParams.username" type="text" placeholder="用户名" class="input-field" />
                        </div>
                        <div class="form-group">
                            <input v-model="registerParams.password" type="password" placeholder="密码" class="input-field" />
                        </div>
                        <div class="form-group">
                            <input v-model="registerParams.email" type="email" placeholder="邮箱" class="input-field" />
                        </div>
                        <div class="form-group verification-group">
                            <input v-model="code" type="text" placeholder="验证码" class="input-field verification-input" />
                            <img :src="codeImage" alt="验证码" class="verification-image" />
                            <button class="verification-button" @click="refreshCode">刷新验证码</button>
                        </div>
                        <button class="login-button" @click="register">注册</button>
                    </template>
                </div>
            </div>
            <div class="login-right" :class="{ 'register-mode': !isLogin }">
                <h2>{{ isLogin ? '没有帐号?' : '已有帐号?' }}</h2>
                <p>{{ isLogin ? '立即注册吧 😃' : '请登录吧 🎉' }}</p>
                <button class="register-button" @click="toggleForm">
                    {{ isLogin ? '注册' : '登录' }}
                </button>
                <button v-show="isLogin" class="register-button" @click="closeApplication">
                   退出
                </button>
            </div>
        </div>
</template>


<style scoped>

.login-box {
    display: flex;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    width: 800px;
    height: 500px;
    position: relative;
    opacity: 0.85;
}

.login-left {
    flex: 1;
    padding: 40px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.6s ease-in-out;
    position: absolute;
    left: 0;
    width: calc(100% - 300px);
    height: 100%;
}

.login-right {
    width: 300px;
    padding: 40px;
    background: #f85f73;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: transform 0.6s ease-in-out;
    position: absolute;
    right: 0;
    height: 100%;
}

h2 {
    margin: 0 0 30px 0;
    font-size: 28px;
    font-weight: 600;
    text-align: center;
}

.form-container {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 20px;
    width: 100%;
}

.input-field {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 16px;
    background: #f5f5f5;
    transition: all 0.3s ease;
}

.input-field:focus {
    outline: none;
    border-color: #f85f73;
    background: white;
}

.form-footer {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.forgot-password {
    color: #666;
    text-decoration: none;
    font-size: 14px;
}

.forgot-password:hover {
    color: #f85f73;
}

.login-button, .register-button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.login-button {
    background: #f85f73;
    color: white;
}

.login-button:hover {
    background: #f74b61;
    transform: translateY(-2px);
}

.register-button {
    background: white;
    color: #f85f73;
    margin-top: 20px;
}

.register-button:hover {
    background: #fafafa;
    transform: translateY(-2px);
}

.login-right p {
    margin: 20px 0;
    font-size: 16px;
}

.verification-group {
    display: flex;
    gap: 10px;
}

.verification-input {
    flex: 1;
}

.verification-button {
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    background: #f85f73;
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
}

.verification-button:hover {
    background: #f74b61;
}

.login-left.register-mode {
    transform: translateX(300px);
}

.login-right.register-mode {
    transform: translateX(-500px);
}

.register-mode .input-field {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 16px;
    background: #f5f5f5;
    transition: all 0.3s ease;
}



.register-mode .input-field:focus {
    outline: none;
    border-color: #f85f73;
    background: white;
}

.register-mode .login-button {
    background: #f85f73;
    color: white;
}

.register-mode .login-button:hover {
    background: #f85f73;
    color: white;
}

.register-mode .register-button {
    background: white;
    color: #f85f73;
}

.register-mode .register-button:hover {
    background: white;
    color: #f85f73;
}

</style>
