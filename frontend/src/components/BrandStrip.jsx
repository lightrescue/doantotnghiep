import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import "../styles/BrandStrip.css";

const BrandStrip = () => {
    const { brands } = useShop();
    return (
        <section className="brand-strip container">
            <div className="section-head">
                <h2>Thương hiệu đồng hành</h2>
            </div>
            <div className="brand-row">
                {brands.map((b) => (
                    <Link key={b.id} to={`/san-pham?q=${encodeURIComponent(b.name)}`} className="brand-chip">
                        <span>{b.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default BrandStrip;

