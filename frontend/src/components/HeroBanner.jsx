import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/HeroBanner.css";

const slides = [
    {
        title: "iPhone 16 Pro Max",
        subtitle: "Thiết kế Titan sa mạc · Chip A18 Pro · Giảm đến 4.000.000đ",
        cta: "Khám phá ngay",
        link: "/san-pham?q=iPhone",
        image: "https://res.cloudinary.com/dpf2uink8/image/upload/v1780138979/viqitech/banners/hero-iphone-15-pro-max.jpg",
        bg: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #2563eb 100%)",
        accent: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
        accentText: "#0f172a",
        badge: "HOT DEAL TUẦN NÀY"
    },
    {
        title: "Laptop Gaming Thế Hệ Mới",
        subtitle: "RTX 40 Series · Màn hình 240Hz · Trả góp 0% lãi suất",
        cta: "Sắm ngay giá tốt",
        link: "/san-pham?cat=laptop",
        image: "https://res.cloudinary.com/dpf2uink8/image/upload/v1780138981/viqitech/banners/hero-laptop-gaming.jpg",
        bg: "linear-gradient(135deg, #2e1065 0%, #581c87 50%, #7c3aed 100%)",
        accent: "linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)",
        accentText: "#ffffff",
        badge: "ƯU ĐÃI GAMER"
    },
    {
        title: "iPad Pro M4 Siêu Mỏng",
        subtitle: "Màn hình OLED Ultra Retina · Tặng kèm Apple Pencil Pro",
        cta: "Xem chi tiết",
        link: "/san-pham?cat=tablet",
        image: "https://res.cloudinary.com/dpf2uink8/image/upload/v1780139342/viqitech/banners/hero-ipad-pro-m4.jpg",
        bg: "linear-gradient(135deg, #064e3b 0%, #047857 50%, #10b981 100%)",
        accent: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
        accentText: "#0f172a",
        badge: "SIÊU PHẨM APPLE"
    },
];

const sideBanners = [
    {
        title: "AirPods Pro Gen 2",
        subtitle: "Chống ồn chủ động · Giảm 1.2tr",
        bg: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        image: "https://res.cloudinary.com/dpf2uink8/image/upload/v1780140038/viqitech/banners/hero-side-airpods.jpg",
        link: "/san-pham?q=AirPods"
    },
    {
        title: "Galaxy Watch Ultra",
        subtitle: "Định vị GPS kép · Trả góp 0%",
        bg: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
        image: "https://res.cloudinary.com/dpf2uink8/image/upload/v1780140040/viqitech/banners/hero-side-watch.jpg",
        link: "/san-pham?q=Watch"
    },
];

const features = [
    { icon: "fa-shield-halved", title: "100% Chính Hãng", desc: "Bảo hành 12 tháng" },
    { icon: "fa-truck-fast", title: "Giao Hàng 2H", desc: "Miễn phí toàn quốc" },
    { icon: "fa-arrow-rotate-left", title: "1 Đổi 1 Trong 30 Ngày", desc: "Lỗi là đổi mới" },
    { icon: "fa-credit-card", title: "Trả Góp 0%", desc: "Duyệt nhanh 5 phút" },
];

const HeroBanner = () => {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5500);
        return () => clearInterval(t);
    }, []);

    const slide = slides[idx];

    return (
        <section className="hero">
            <div className="container">
                <div className="hero-grid">
                    <div className="hero-slider" style={{ background: slide.bg }}>
                        <div className="hero-content">
                            <span className="hero-tag" style={{ background: slide.accent, color: slide.accentText }}>
                                <i className="fa-solid fa-fire"></i> {slide.badge}
                            </span>
                            <h1>{slide.title}</h1>
                            <p>{slide.subtitle}</p>
                            <Link to={slide.link} className="hero-cta" style={{ background: slide.accent, color: slide.accentText }}>
                                {slide.cta} <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>

                        <div className="hero-image" key={idx}>
                            <img src={slide.image} alt={slide.title} />
                        </div>

                        <div className="hero-dots">
                            {slides.map((_, i) => (
                                <button
                                    key={i}
                                    className={i === idx ? "active" : ""}
                                    onClick={() => setIdx(i)}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="hero-side">
                        {sideBanners.map((b, i) => (
                            <Link to={b.link} key={i} className="hero-side-item" style={{ background: b.bg }}>
                                <div className="hero-side-content">
                                    <h3>{b.title}</h3>
                                    <p>{b.subtitle}</p>
                                    <span className="hero-side-btn">Xem ngay <i className="fa-solid fa-chevron-right"></i></span>
                                </div>
                                {b.image && (
                                    <div className="hero-side-image">
                                        <img src={b.image} alt={b.title} />
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Service Features Bar */}
                <div className="hero-features-bar">
                    {features.map((f, i) => (
                        <div key={i} className="feature-item">
                            <div className="feature-icon">
                                <i className={`fa-solid ${f.icon}`}></i>
                            </div>
                            <div className="feature-info">
                                <h4>{f.title}</h4>
                                <p>{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;

