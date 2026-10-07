import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../styles/FlashSale.css";

const useCountdown = (totalSeconds) => {
    const [s, setS] = useState(totalSeconds);
    useEffect(() => {
        const t = setInterval(() => setS((v) => (v > 0 ? v - 1 : 0)), 1000);
        return () => clearInterval(t);
    }, []);
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return { h, m, s: sec };
};

const FlashSale = ({ products }) => {
    const { h, m, s } = useCountdown(5 * 3600 + 24 * 60 + 12);

    if (!products || products.length === 0) return null;

    return (
        <section className="flash-sale-section container">
            <div className="flash-sale-card">
                <div className="fs-head">
                    <div className="fs-title-wrap">
                        <div className="fs-bolt-icon">
                            <i className="fa-solid fa-bolt-lightning"></i>
                        </div>
                        <div>
                            <h2 className="fs-heading">FLASH SALE</h2>
                            <span className="fs-sub">Giá sốc giảm tới 50% - Số lượng có hạn</span>
                        </div>
                    </div>

                    <div className="fs-timer-wrap">
                        <span className="timer-label">Kết thúc sau:</span>
                        <div className="fs-clock">
                            <div className="clock-box"><span>{h}</span><small>Giờ</small></div>
                            <span className="clock-dots">:</span>
                            <div className="clock-box"><span>{m}</span><small>Phút</small></div>
                            <span className="clock-dots">:</span>
                            <div className="clock-box"><span>{s}</span><small>Giây</small></div>
                        </div>
                    </div>

                    <Link to="/khuyen-mai" className="fs-view-all">
                        Xem tất cả deal <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>

                <div className="fs-grid">
                    {products.slice(0, 5).map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlashSale;

