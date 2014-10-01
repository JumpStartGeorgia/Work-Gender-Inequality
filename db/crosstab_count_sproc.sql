 drop procedure if exists survey_crosstab_count;
 
 DELIMITER //
 CREATE PROCEDURE survey_crosstab_count(field_rows varchar(50), field_cols varchar(50))
   BEGIN

      SET @sql := CONCAT("SELECT 
					    CONCAT('SELECT ",
				    SQL_ESC(field_rows),
				    ",	', GROUP_CONCAT(DISTINCT CONCAT('sum(IF(",
                       SQL_ESC(field_cols),
				    "=', QUOTE(",
				    SQL_ESC(field_cols),
				    "),', 1,0)) AS ',SQL_ESC(",
				    SQL_ESC(field_cols),
				    ") )), ' FROM  survey_results where ", SQL_ESC(field_rows), " != \"\" GROUP BY ",
				    SQL_ESC(field_rows),
				    "')
         INTO   @sql
         FROM   survey_results
	      where ", SQL_ESC(field_cols), " != '' " 
      );

    PREPARE stmt FROM @sql; 
    EXECUTE stmt; 
    DEALLOCATE PREPARE stmt;

    PREPARE stmt FROM @sql; 
    EXECUTE stmt; 
    DEALLOCATE PREPARE stmt;
        
   END //
 DELIMITER ;
