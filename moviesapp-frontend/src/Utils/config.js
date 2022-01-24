const api_endpoint_development = 'http://localhost:5000/'
	, api_endpoint_production ='http://localhost:5000/';

module.exports = {
	api_endpoint: process.env.NODE_ENV === 'production'
     ? api_endpoint_production : api_endpoint_development,
};