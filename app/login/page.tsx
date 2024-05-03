"use client";
import style from "@/styles/login.module.css";
import { authenticate } from "@/lib/actions";
import { useFormState } from "react-dom";
import Footer from "../components/footer";

export default function Page() {
  	// 추후에 추가될 로그인 메소드
    const [errorMsg, dispatch] = useFormState(authenticate, undefined);
    return (
        <div id="wrap" className={style.login_wrap}>
            <div className={style.container}>
                <h1>프로퍼티파트너스</h1>
                <div className={style.content}>
                    <form id="loginForm" autoComplete="off" action={dispatch}>
                        <div className={style.input_box}>
                            <div className={style.icon_cell}>
                                <i aria-label="아이디"></i>
                            </div>
                            <input type="text" name="swId" placeholder="사원아이디" />
                        </div>
                        <div className={style.input_box}>
                            <div className={style.icon_cell}>
                                <i aria-label="비밀번호"></i>
                            </div>
                            <input type="password" name="swPwd" placeholder="비밀번호" />
                        </div>
                        <div className={style.btn_wrap}>
                            <button type="submit">로그인</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
  }