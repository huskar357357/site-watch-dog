module.exports = {
	// fetch and save all table data
	"sql_bet_log": 				"SELECT * FROM bet_log WHERE ((11 <= game_id AND game_id <= 28 AND game_id != 26) OR (66 <= game_id AND game_id <= 80) OR game_id = 34) AND '{st_date}' <= updated_at",
	"sql_del_bet_log": 			"DELETE FROM bet_log",
	"sql_ins_bet_log": 			"INSERT INTO bet_log VALUES ",
	"sql_hy": 					"SELECT * FROM hy WHERE '{st_date}' <= login_at",
	"sql_del_hy": 				"DELETE FROM hy",
	"sql_ins_hy": 				"INSERT INTO hy VALUES ",
	"sql_cash_flow": 			"SELECT * FROM cash_flow WHERE '{st_date}' <= updated_at",
	"sql_del_cash_flow": 		"DELETE FROM cash_flow",
	"sql_ins_cash_flow": 		"INSERT INTO cash_flow VALUES ",
	"sql_wallet_request": 		"SELECT * FROM wallet_request WHERE '{st_date}' <= updated_at",
	"sql_del_wallet_request":   "DELETE FROM wallet_request",
	"sql_ins_wallet_request":   "INSERT INTO wallet_request VALUES ",
	"sql_member_bonus": 		"SELECT * FROM member_bonus WHERE '{st_date}' <= updated_at",
	"sql_del_member_bonus": 	"DELETE FROM member_bonus",
	"sql_ins_member_bonus": 	"INSERT INTO member_bonus VALUES ",

	// fetch and save all data for rule1,2,3
	"sql_cash_sum": 			"SELECT uid, SUM(amount) FROM cash_flow WHERE uid = '{uid}' AND '{st_date}' <= updated_at",
	"sql_bonus_sum": 			"SELECT uid, SUM(return_bonus) FROM member_bonus WHERE uid = '{uid}' AND '{st_date}' <= updated_at",
	"sql_del_rule11": 			"DELETE FROM check_rule11_rslt",
	"sql_del_rule12": 			"DELETE FROM check_rule12_rslt",
	"sql_ins_rule11": 			"INSERT INTO check_rule11_rslt (uid, hy_money, sum_cash_amnt, nick_name) VALUES ",
	"sql_ins_rule12": 			"INSERT INTO check_rule12_rslt (uid, hy_return_money, sum_bonus_amnt, nick_name) VALUES ",
	"sql_cash_amnt_thirdparty": "SELECT amount FROM cash_flow WHERE reference_id = (SELECT id FROM wallet_request WHERE bet_log_id = '{id}' AND '{st_date}' <= updated_at) AND action = 'third-party' AND '{st_date}' <= updated_at",
	"sql_del_rule2": 			"DELETE FROM check_rule2_rslt",
	"sql_ins_rule2": 			"INSERT INTO check_rule2_rslt (bet_log_id, uid, bet_amount, cash_flow_amount, nick_name) VALUES ",	
	"sql_cash_amnt_deductions": "SELECT amount FROM cash_flow WHERE reference_id = '{id}' AND action = 'deductions' AND '{st_date}' <= updated_at",
	"sql_del_rule3": 			"DELETE FROM check_rule3_rslt",
	"sql_ins_rule3": 			"INSERT INTO check_rule3_rslt (bet_log_id, uid, bet_amount, cash_flow_amount, nick_name) VALUES ",

	// get column name of given table
	"sql_column": 				"SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA`='tenant_aa' AND `TABLE_NAME`='{table_name}'",

	// fetch rule1,2,3
	"sql_sel_bet_log": 			"SELECT * FROM bet_log",
	"sql_sel_hy": 				"SELECT * FROM hy",
	"sql_sel_cash_flow": 		"SELECT * FROM cash_flow",
	"sql_sel_wallet_request": 	"SELECT * FROM wallet_request",
	"sql_sel_member_bonus": 	"SELECT * FROM member_bonus",
	"sql_sel_rule11": 			"SELECT * FROM check_rule11_rslt",
	"sql_sel_rule12": 			"SELECT * FROM check_rule12_rslt",
	"sql_sel_rule2": 			"SELECT * FROM check_rule2_rslt",
	"sql_sel_rule3": 			"SELECT * FROM check_rule3_rslt",
}