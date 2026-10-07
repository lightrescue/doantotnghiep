import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatPrice, getDiscountPercent } from "../data/products";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
    const discount = getDiscountPercent(product.price, product.oldPrice);
    const { addItem } = useCart();
    const { isLoggedIn } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const onAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoggedIn) {
            toast.show("Vui lòng đăng nhập để thêm vào giỏ.", "info");
            navigate("/dang-nhap", { state: { from: location.pathname + location.search } });
            return;
        }
        addItem(product, 1);
        toast.show(`Đã thêm "${product.name}" vào giỏ hàng`, "success");
    };

    return (
        <Link to={`/san-pham/${product.id}`} className="product-card">
            {product.badge && (
                <div className={`product-badge-wrap ${product.badge.startsWith("-") ? "badge-discount" : "badge-hot"}`}>
                    <span>{product.badge}</span>
                </div>
            )}

            <div className="product-thumb">
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="product-quick-actions">
                    <button type="button" className="action-btn" title="Thêm vào giỏ" onClick={onAdd}>
                        <i className="fa-solid fa-bag-shopping"></i>
                    </button>
                    <span className="action-btn" title="Xem chi tiết">
                        <i className="fa-solid fa-eye"></i>
                    </span>
                </div>
            </div>

            <div className="product-body">
                {product.brand && (
                    <span className="product-brand-tag">{product.brand}</span>
                )}
                <h3 className="product-name" title={product.name}>{product.name}</h3>

                <div className="product-price">
                    <span className="price-now">{formatPrice(product.price)}</span>
                    {discount > 0 && (
                        <span className="price-old">{formatPrice(product.oldPrice)}</span>
                    )}
                </div>

                <div className="product-meta">
                    <div className="rating">
                        <i className="fa-solid fa-star"></i>
                        <span>{product.rating || "5.0"}</span>
                    </div>
                    <div className="sold">
                        <i className="fa-solid fa-fire-flame-curved"></i> Đã bán {product.sold || 120}
                    </div>
                </div>

                <button type="button" className="btn-buy" onClick={onAdd}>
                    <i className="fa-solid fa-cart-plus"></i> Thêm giỏ hàng
                </button>
            </div>
        </Link>
    );
};

export default ProductCard;

