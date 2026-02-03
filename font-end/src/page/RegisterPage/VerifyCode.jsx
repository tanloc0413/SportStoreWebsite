import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../css/user/register.css";
import { useDispatch } from "react-redux";
import { setLoading } from "../../store/features/common";
import { verifyAPI } from "../../api/authentication";

const VerifyCode = ({ email }) => {
  // đếm ngược
  const [timeLeft, setTimeLeft] = useState(600);

  // set thời gian đếm ngược
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // format thời gian
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // lấy giá trị để nhập code
  const [values, setValues] = useState({
    userName: email,
    code: "",
  });

  // báo lỗi
  const [error, setError] = useState("");

  // loading
  const dispatch = useDispatch();

  // thông báo
  const [message, setMessage] = useState("");

  // điều hướng
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError("");
      dispatch(setLoading(true));
      verifyAPI(values)
        .then((res) => {
          setMessage("Xác thực tài khoản thành công!", res);
          navigate("/dang-nhap");
        })
        .catch((err) => {
          setError(
            "Mã xác thực bạn đã nhập không chính xác hoặc đã hết hạn!",
            err,
          );
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    },
    [dispatch, values],
  );

  // thay đổi giá trị
  const handleOnChange = useCallback((e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target?.value,
    }));
  }, []);

  // hết time thì điều hướng lại trang dăng ký
  useEffect(() => {
    const TIMEOUT = 10 * 60 * 1000; // 10 phút

    let timeout;

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        navigate("/dang-ky");
      }, TIMEOUT);
    };

    // Các hành động được xem là đang hoạt động
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    // bắt đầu timer lần đầu
    resetTimer();

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [navigate]);

  return (
    <>
      {!message && (
        <div className="verify_blk">
          <p className="verify_title">Xác thực email</p>
          <form className="verify_form" onSubmit={onSubmit}>
            <input
              type="text"
              name="code"
              className="verify_input"
              placeholder="Nhập mã xác thực gồm 6 số"
              maxLength={6}
              onChange={handleOnChange}
              value={values?.code}
              required
            />
            <div className="verify_message">
              {message && <p className="verify-success">{message}</p>}
              {error && <p className="verify-error">{error}</p>}
            </div>
            <button className="verify_btn" type="submit">
              Xác thực
            </button>
            <div className="verify_timer">
              <p className="verify_timer-text">
                Mã hiệu lực còn: <span>{formatTime(timeLeft)}</span>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default VerifyCode;
