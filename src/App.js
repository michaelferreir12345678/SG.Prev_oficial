import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';

import Dashboard from './components/Dashboard';

import EmptyPage from './pages/EmptyPage';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';
import MetaAtuarial from './pages/MetaAtuarial';
import Login from './pages/Login';
import { LoginService } from './service/LoginService';

const App = () => {
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const loginService = new LoginService();
    const copyTooltipRef = useRef();
    const location = useLocation();


    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            label: 'Home',
            items: [{
                label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'
            }]
        },
        {
            label: 'Menu',
            items: [
                {
                    label: 'Política de investimento',
                    items: [
                        {
                            label: 'Meta Atuarial',
                            icon: 'pi pi-fw pi-pencil',
                            to: '/pages/meta-atuarial'
                        },
                        {
                            label: 'Política de investimento',
                        }, {
                            label: 'Limites Legais - Resolução',
                        }, {
                            label: 'Grupos de fundos de investimentos',
                        },
                    ]
                },
                {
                    label: 'Carteira',
                    items: [
                        {
                            label: 'Composição',
                        },
                        {
                            label: 'Movimentações',
                        },
                        {
                            label: 'Saldo do dia',
                        },
                        {
                            label: 'Movimentações ativo',
                        },
                    ]
                },
                {
                    label: 'Performance',
                    items: [
                        {
                            label: 'Carteira vs Meta',
                        },
                        {
                            label: 'Carteira vs Meta por Ano',
                        },
                        {
                            label: 'Performance Carteira',
                        },
                        {
                            label: 'Análise de Risco Carteira',
                        },
                        {
                            label: 'Comparador de Fundos',
                        },
                        {
                            label: 'Acompanhamento de Fundos',
                        },

                    ]
                },
                {
                    label: 'Aplicação Financeira',
                    items: [
                        {
                            label: 'Fronteira de Eficiência',
                        },
                        {
                            label: 'Carteiras Livres',
                        },
                    ]
                },
                {
                    label: 'Asset Liability Management',
                    items: [
                        {
                            label: 'ALM - Modelo Cash Flow Matching',
                        },
                    ]
                },
                {
                    label: 'Mercado',
                    items: [
                        {
                            label: 'Expectativas do Mercado',
                        },
                        {
                            label: 'Indexadores',
                        },
                    ]
                },
            ]
        },
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });

    const Pagina = () => {
        return (
            <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} />
                    <Route path="/empty" component={EmptyPage} />
                    <Route path="/pages/meta-atuarial" component={MetaAtuarial}/>
                    <Route path="/login" component={Login}/>
                </div>

                <AppFooter layoutColorMode={layoutColorMode} />
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>

        </div>
        )
    }

    return (
        <div>
            {
                loginService.autenticado() ?
                <Pagina/>
                :
                <Login/>
            }
        </div>        
    );

}

export default App;
