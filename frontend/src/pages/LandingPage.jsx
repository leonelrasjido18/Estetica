import { ArrowRight, Star, Clock, Smartphone, Send, Sparkles, ChevronLeft, ChevronRight, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getReviews, addReview } from '../api';

const LandingPage = () => {
    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({ clientName: '', rating: 5, comment: '' });
    const [reviewMsg, setReviewMsg] = useState('');

    const [isLightMode, setIsLightMode] = useState(() => {
        return localStorage.getItem('theme') === 'light';
    });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const carouselImages = [
        '/carousel-1.png',
        '/carousel-2.png',
        '/carousel-3.png',
        '/carousel-4.png'
    ];

    useEffect(() => {
        getReviews().then(r => { if (Array.isArray(r)) setReviews(r); }).catch(() => { });
    }, []);

    useEffect(() => {
        if (isLightMode) {
            document.documentElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    }, [isLightMode]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!reviewForm.clientName) return;
        try {
            const res = await addReview(reviewForm);
            if (res && res.success) {
                setReviewMsg('¡Gracias por tu reseña!');
                setReviewForm({ clientName: '', rating: 5, comment: '' });
                setShowReviewForm(false);
                getReviews().then(r => { if (Array.isArray(r)) setReviews(r); }).catch(() => { });
                setTimeout(() => setReviewMsg(''), 3000);
            }
        } catch (err) {
            console.error('Error enviando reseña:', err);
        }
    };

    const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0';

    return (
        <div style={{ backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Navbar Minimalista */}
            <nav className="landing-navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', padding: '20px 50px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                        src="/logo-jv.png"
                        alt="JV Centro Estético Logo"
                        style={{
                            width: '55px',
                            height: '55px',
                            objectFit: 'cover',
                            flexShrink: 0,
                            borderRadius: '50%',
                        }}
                    />
                    <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: '600', letterSpacing: '2px', color: 'var(--text-primary)', lineHeight: 1.1 }}>JV Centro Estético</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--accent-primary)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: '400' }}>Cada piel tiene su propia historia</div>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <button 
                        onClick={() => setIsLightMode(!isLightMode)}
                        className="btn-secondary" 
                        style={{ padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        title="Cambiar Tema"
                    >
                        {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <button className="btn-secondary" onClick={() => navigate('/login')} style={{ fontSize: '0.9rem', padding: '10px 24px', borderRadius: '100px' }}>
                        Acceso Staff
                    </button>
                </div>
            </nav>

            <main className="landing-main" style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '60px 0' }}>
                {/* Left Side: Content */}
                <div className="animate-fade-in landing-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 80px' }}>

                    <div className="landing-bagde" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: 'rgba(201, 169, 110, 0.07)', border: '1px solid rgba(201, 169, 110, 0.2)', borderRadius: '100px', marginBottom: '30px', color: 'var(--accent-primary)', fontWeight: '500', letterSpacing: '2px', fontSize: '0.75rem', width: 'fit-content', fontFamily: 'var(--font-body)' }}>
                        <Sparkles size={13} /> CENTRO ESTÉTICO PREMIUM
                    </div>

                    <h1 className="landing-title" style={{ fontFamily: 'var(--font-display)', fontWeight: '300', lineHeight: '1.08', marginBottom: '20px', letterSpacing: '0px', fontSize: '4.2rem' }}>
                        Tu piel, <span style={{ color: 'var(--accent-primary)', fontStyle: 'italic' }}>merece</span><br />
                        <span style={{ fontWeight: '600' }}>lo mejor.</span>
                    </h1>

                    <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '35px', maxWidth: '480px', lineHeight: '1.8', fontWeight: '300' }}>
                        Reservá tu turno en segundos. Elegí el servicio, seleccioná tu horario y recibí la confirmación directo en tu WhatsApp.
                    </p>

                    <button className="btn-primary landing-btn" onClick={() => navigate('/reserva')} style={{ padding: '20px 40px', fontSize: '1rem', width: 'fit-content', borderRadius: '100px', letterSpacing: '2px', boxShadow: '0 15px 30px -10px rgba(201,169,110,0.4)' }}>
                        RESERVAR AHORA <ArrowRight size={22} className="ml-2" />
                    </button>

                    <div className="landing-features" style={{ display: 'flex', gap: '30px', marginTop: '45px', borderTop: '1px solid var(--border-light)', paddingTop: '25px' }}>
                        <div className="landing-feature-item" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--feature-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Smartphone color="var(--text-primary)" size={22} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>Alertas vía WhatsApp</h4>
                                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '300' }}>Confirmación instantánea</span>
                            </div>
                        </div>
                        <div className="landing-feature-item" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--feature-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Clock color="var(--text-primary)" size={22} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>Rápido y Fácil</h4>
                                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: '300' }}>Agenda en 1 minuto</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Image Carousel */}
                <div className="animate-fade-in landing-img-container" style={{ flex: 1, display: 'flex', alignItems: 'center', paddingRight: '40px' }}>
                    <div className="landing-carousel-wrapper" style={{ width: '100%', height: '550px', borderRadius: '30px', overflow: 'hidden', position: 'relative', border: '1px solid var(--border-light)', boxShadow: '0 30px 60px -15px var(--carousel-shadow)', backgroundColor: 'transparent' }}>
                        <div style={{ position: 'absolute', inset: 0, background: 'var(--gradient-overlay-left)', zIndex: 1 }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'var(--gradient-overlay-bottom)', zIndex: 1 }} />
                        
                        {carouselImages.map((src, index) => (
                            <img
                                key={src}
                                src={src}
                                alt={`JV Centro Estético - Imagen ${index + 1}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    opacity: index === currentImageIndex ? 1 : 0,
                                    transition: 'opacity 0.8s ease-in-out'
                                }}
                            />
                        ))}

                        {/* Controles del Carrusel */}
                        <button 
                            onClick={prevImage}
                            className="carousel-btn"
                            style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: 'var(--carousel-btn-bg)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.3s backdrop-filter', backdropFilter: 'blur(5px)' }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--bg-primary)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'var(--carousel-btn-bg)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={nextImage}
                            className="carousel-btn"
                            style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, background: 'var(--carousel-btn-bg)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', cursor: 'pointer', transition: 'all 0.3s backdrop-filter', backdropFilter: 'blur(5px)' }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--accent-primary)'; e.currentTarget.style.color = 'var(--bg-primary)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'var(--carousel-btn-bg)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                        >
                            <ChevronRight size={24} />
                        </button>
                        
                        {/* Indicadores */}
                        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', gap: '8px' }}>
                            {carouselImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    style={{
                                        width: '10px', height: '10px', borderRadius: '50%', border: 'none',
                                        background: index === currentImageIndex ? 'var(--accent-primary)' : 'var(--border-light-hover)',
                                        cursor: 'pointer', transition: 'background 0.3s'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>



            {/* ====== SERVICIOS ====== */}
            <section style={{ padding: '70px 50px', borderTop: '1px solid var(--border-light)', backgroundColor: 'rgba(201,169,110,0.02)' }}>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: '12px' }}>Nuestros Servicios</p>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', fontWeight: '300', letterSpacing: '0px' }}>
                        Tratamientos <span style={{ fontStyle: 'italic', color: 'var(--accent-primary)' }}>exclusivos</span> para vos
                    </h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>
                    {[
                        {
                            title: 'Corporales',
                            icon: '✦',
                            items: ['Depilación Láser', 'Radiofrecuencias', 'Maderoterapia', 'Drenaje Linfático', 'Mesoterapia', 'Estimuladores Musculares']
                        },
                        {
                            title: 'Faciales',
                            icon: '✦',
                            items: ['Limpieza Facial', 'Peeling', 'Dermaplaning', 'Microneedling', 'Botox', 'Relleno de labios']
                        },
                        {
                            title: 'Beauty Studio',
                            icon: '✦',
                            items: ['Manicura', 'Uñas semipermanente', 'Extensiones de Pestañas', 'Lifting de Pestañas', 'Make up']
                        }
                    ].map(cat => (
                        <div key={cat.title} style={{ padding: '30px', backgroundColor: 'var(--card-bg)', borderRadius: '16px', border: '1px solid rgba(201,169,110,0.12)', boxShadow: 'var(--shadow-subtle)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                <span style={{ color: 'var(--accent-primary)', fontSize: '1rem' }}>{cat.icon}</span>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: '500', color: 'var(--text-primary)' }}>{cat.title}</h3>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {cat.items.map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '300' }}>
                                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', flexShrink: 0, display: 'inline-block' }}></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <button className="btn-primary" onClick={() => window.location.href = '/reserva'} style={{ borderRadius: '100px', padding: '16px 36px', letterSpacing: '2px', fontSize: '0.85rem' }}>
                        RESERVAR TURNO <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            {/* ====== RESEÑAS ====== */}
            <section style={{ padding: '60px 50px', borderTop: '1px solid var(--border-light)', backgroundColor: 'var(--light-bg)' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', fontWeight: '400', marginBottom: '10px' }}>
                        Lo que dicen nuestras <span style={{ color: 'var(--accent-primary)', fontStyle: 'italic' }}>clientas</span>
                    </h2>
                    {reviews.length > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fbbf24' }}>{avgRating}</span>
                            <div style={{ color: '#fbbf24', fontSize: '1.2rem' }}>{'★'.repeat(Math.round(avgRating))}</div>
                            <span style={{ color: 'var(--text-secondary)' }}>({reviews.length} reseña{reviews.length > 1 ? 's' : ''})</span>
                        </div>
                    )}
                </div>

                {reviewMsg && <div style={{ textAlign: 'center', padding: '15px', backgroundColor: 'rgba(0,204,102,0.1)', borderRadius: '10px', color: 'var(--success)', marginBottom: '20px', maxWidth: '600px', margin: '0 auto 20px' }}>{reviewMsg}</div>}

                {reviews.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '1000px', margin: '0 auto 30px' }}>
                        {reviews.slice(0, 6).map(r => (
                            <div key={r.id} style={{ padding: '25px', backgroundColor: 'var(--card-bg)', borderRadius: '15px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-subtle)' }}>
                                <div style={{ color: '#fbbf24', marginBottom: '10px' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                                {r.comment && <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '15px', lineHeight: '1.6' }}>"{r.comment}"</p>}
                                <div style={{ fontWeight: '600' }}>— {r.clientName}</div>
                            </div>
                        ))}
                    </div>
                )}

                <div style={{ textAlign: 'center' }}>
                    {!showReviewForm ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                            <button onClick={() => setShowReviewForm(true)} className="btn-secondary" style={{ padding: '12px 30px', borderRadius: '100px', border: '1px solid var(--accent-primary)', color: 'var(--accent-primary)' }}>
                                ⭐ Dejá tu Reseña
                            </button>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '400px', lineHeight: '1.5' }}>
                                📱 Al completar tu turno recibirás un mensaje por WhatsApp para calificar tu experiencia
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmitReview} style={{ maxWidth: '500px', margin: '0 auto', padding: '30px', backgroundColor: 'var(--feature-bg)', borderRadius: '15px', border: '1px solid var(--border-light)' }}>
                            <h3 style={{ marginBottom: '20px' }}>Tu Opinión Importa</h3>
                            <div style={{ marginBottom: '15px' }}>
                                <label className="input-label" style={{ display: 'block', marginBottom: '8px' }}>Tu Nombre</label>
                                <input className="input-field" placeholder="Ej: Juan" value={reviewForm.clientName} onChange={e => setReviewForm({ ...reviewForm, clientName: e.target.value })} required style={{ padding: '12px' }} />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label className="input-label" style={{ display: 'block', marginBottom: '8px' }}>Calificación</label>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {[1, 2, 3, 4, 5].map(n => (
                                        <button key={n} type="button" onClick={() => setReviewForm({ ...reviewForm, rating: n })}
                                            style={{ fontSize: '1.8rem', background: 'none', border: 'none', cursor: 'pointer', color: n <= reviewForm.rating ? '#fbbf24' : 'var(--border-light-hover)' }}>★</button>
                                    ))}
                                </div>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label className="input-label" style={{ display: 'block', marginBottom: '8px' }}>Comentario (opcional)</label>
                                <textarea className="input-field" placeholder="Contanos tu experiencia..." value={reviewForm.comment} onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })} rows={3} style={{ padding: '12px', resize: 'vertical' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <Send size={16} /> Enviar Reseña
                                </button>
                                <button type="button" onClick={() => setShowReviewForm(false)} style={{ padding: '12px 20px', backgroundColor: 'var(--border-light)', border: '1px solid var(--border-light-hover)', borderRadius: '8px', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>

            {/* Footer Minimalista */}
            <footer style={{
                padding: '40px 50px',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--card-bg)',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    © {new Date().getFullYear()} <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-display)', fontWeight: '600', letterSpacing: '1px' }}>JV Centro Estético</span>. Todos los derechos reservados.
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.95rem', color: 'var(--text-primary)' }}>Cada piel tiene su propia historia</span>
                    <a href="https://synory.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)', fontWeight: '800', textDecoration: 'none', padding: '8px 16px', border: '1px solid var(--accent-primary)', borderRadius: '50px', fontSize: '0.8rem' }}>
                        CREADO POR SYNORY.DEV
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
