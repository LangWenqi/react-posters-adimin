let domainsFuc = (env) => {
    let domain,href = window.location.href;
    if (env === 'development' || href.includes('test_posters')) {
        domain = 'http://192.168.1.160:8082/crm'
    }else{
        domain = 'http://manage.i31.com:8082/crm'
    }
    return {
        domain:domain
    }
};
export default domainsFuc
