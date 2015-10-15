module.exports = function(Transaction) {
	Transaction.beforeCreate = function (next) {
		var app = this;
		app.date = new Date();
		next();
	};
};
