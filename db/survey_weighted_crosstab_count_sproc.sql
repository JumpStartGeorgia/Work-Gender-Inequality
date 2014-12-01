drop procedure if exists survey_weighted_crosstab_count;

DELIMITER //
CREATE PROCEDURE survey_weighted_crosstab_count(weight_col varchar(50), field_rows varchar(50), field_cols varchar(50), field_where varchar(1000))
 BEGIN

    SET @sql := CONCAT("SELECT 
            CONCAT('SELECT ",
          SQL_ESC(field_rows),
          ",  ', GROUP_CONCAT(DISTINCT CONCAT('sum(IF(",
                     SQL_ESC(field_cols),
          "=', QUOTE(",
          SQL_ESC(field_cols),
          "),', ", SQL_ESC(weight_col), ",0)) AS ',SQL_ESC(",
          SQL_ESC(field_cols),
          ") )), ' FROM  survey_results where ", SQL_ESC(field_rows), " != \"\" ", field_where , " GROUP BY ",
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
