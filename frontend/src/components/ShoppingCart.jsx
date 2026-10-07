import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../data/products";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";
import "../styles/ShoppingCart.css";

const FREE_SHIP_THRESHOLD = 500000;

const ShoppingCart = () => {
    const { items, subtotal, updateQty, removeItem, clear } = useCart();
    const { isLoggedIn } = useAuth();
    const toast = useToast();
    const nav = useNavigate();

    const shipping = items.length > 0 && subtotal < FREE_SHIP_THRESHOLD ? 30000 : 0;
    const total = subtotal + shipping;
    const progress = Math.min(100, Math.round((subtotal / FREE_SHIP_THRESHOLD) * 100));
    const neededForFreeShip = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);

    if (!isLoggedIn) {
        return (
            <div className="container cart-page">
                <div className="auth-required">
                    <i className="fa-solid fa-lock"></i>
                    <h2>Bạn chưa đăng nhập</h2>
                    <p>Vui lòng đăng nhập để xem và quản lý giỏ hàng của bạn.</p>
                    <Link to="/dang-nhap" state={{ from: "/gio-hang" }} className="btn-primary btn-lg">
                        <i className="fa-solid fa-right-to-bracket"></i> Đăng nhập ngay
                    </Link>
                </div>
            </div>
        );
    }

    const onCheckout = () => {
        if (!isLoggedIn) {
            toast.show("Vui lòng đăng nhập để thanh toán.", "info");
            nav("/dang-nhap", { state: { from: "/thanh-toan" } });
            return;
        }
        nav("/thanh-toan");
    };

    if (items.length === 0) {
        return (
            <div className="container cart-page">
                <div className="cart-empty">
                    <div className="empty-cart-icon">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                    <h2>Giỏ hàng của bạn đang trống</h2>
                    <p>Khám phá hàng nghìn sản phẩm công nghệ giá tốt và nhận siêu ưu đãi tại ViQiTech.</p>
                    <Link to="/san-pham" className="btn-primary btn-lg">
                        <i className="fa-solid fa-bag-shopping"></i> Khám phá sản phẩm
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container cart-page">
            <nav className="breadcrumbs">
                <Link to="/">Trang chủ</Link>
                <i className="fa-solid fa-chevron-right"></i>
                <span>Giỏ hàng</span>
            </nav>

            <div className="cart-header-wrap">
                <h1 className="page-title">Giỏ hàng ({items.length} sản phẩm)</h1>
            </div>

            {/* Free Shipping Progress */}
            <div className="freeship-banner">
                <div className="freeship-text">
                    <i className="fa-solid fa-truck-fast"></i>
                    {neededForFreeShip > 0 ? (
                        <span>Mua thêm <b>{formatPrice(neededForFreeShip)}</b> để được <b>Miễn phí giao hàng</b></span>
                    ) : (
                        <span className="freeship-achieved"><i className="fa-solid fa-circle-check"></i> Bạn đã đạt điều kiện <b>Miễn phí giao hàng</b> toàn quốc!</span>
                    )}
                </div>
                <div className="freeship-progress">
                    <div className="freeship-bar" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <div className="cart-layout">
                <div className="cart-list">
                    <div className="cart-row cart-head">
                        <span>Sản phẩm</span>
                        <span>Đơn giá</span>
                        <span>Số lượng</span>
                        <span>Tạm tính</span>
                        <span></span>
                    </div>

                    {items.map((r) => (
                        <div key={r.id} className="cart-row">
                            <div className="cart-product">
                                <img src={r.image} alt={r.name} />
                                <div className="cart-prod-info">
                                    <Link to={`/san-pham/${r.id}`} className="cart-prod-title">{r.name}</Link>
                                    <span className="cart-prod-badge">Chính hãng 100%</span>
                                </div>
                            </div>
                            <div className="cart-price">{formatPrice(r.price)}</div>
                            <div className="cart-qty">
                                <button type="button" onClick={() => updateQty(r.id, r.qty - 1)}>−</button>
                                <span>{r.qty}</span>
                                <button type="button" onClick={() => updateQty(r.id, r.qty + 1)}>+</button>
                            </div>
                            <div className="cart-subtotal">{formatPrice(r.price * r.qty)}</div>
                            <button type="button" className="cart-remove" onClick={() => removeItem(r.id)} title="Xóa">
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    ))}

                    <div className="cart-foot">
                        <button
                            type="button"
                            className="link-clear"
                            onClick={() => { clear(); toast.show("Đã xóa toàn bộ giỏ hàng.", "info"); }}
                        >
                            <i className="fa-solid fa-trash"></i> Xóa tất cả sản phẩm
                        </button>
                    </div>
                </div>

                <aside className="cart-summary">
                    <h3>Tóm tắt đơn hàng</h3>
                    <div className="sum-row"><span>Tạm tính</span><span>{formatPrice(subtotal)}</span></div>
                    <div className="sum-row">
                        <span>Phí vận chuyển</span>
                        <span className={shipping === 0 ? "free-ship-tag" : ""}>
                            {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
                        </span>
                    </div>
                    <div className="sum-row total">
                        <span>Tổng cộng</span>
                        <strong>{formatPrice(total)}</strong>
                    </div>

                    <button type="button" className="btn-primary btn-full btn-lg" onClick={onCheckout}>
                        Tiến hành thanh toán <i className="fa-solid fa-arrow-right"></i>
                    </button>
                    <Link to="/san-pham" className="link-back">
                        <i className="fa-solid fa-arrow-left"></i> Tiếp tục mua sắm
                    </Link>
                </aside>
            </div>
        </div>
    );
};

export default ShoppingCart;

