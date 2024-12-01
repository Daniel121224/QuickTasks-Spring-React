import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Importa tu archivo CSS
import logo from '../../assets/logo2.png'; // Asegúrate de que la ruta al logo sea correcta

const Login = () => {
    //para redireccionar de un componente a otro
    const navigate = useNavigate();

    useEffect(() => {
        document.getElementById('ingresar').focus();
    }, []);

    const ingresar = () => {
        // Redirige directamente al home sin necesidad de validar credenciales
        navigate('/home');
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <Link to={"#"}><b>Iniciar </b>Sesión</Link>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <div className="text-center mb-2">
                            <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto'}} />
                        </div>
                        <p className="login-box-msg">Bienvenido, haga clic en Ingresar:</p>
                        <div className="social-auth-links text-center mb-3">
                            <button id="ingresar" onClick={ingresar} className="btn btn-block btn-primary">
                                Ingresar
                            </button>
                            <Link to={"/crear-cuenta"} className="btn btn-block btn-danger">
                                Registrarse
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
