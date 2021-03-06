CREATE FUNCTION SQL_ESC(_identifier VARCHAR(64))
RETURNS VARCHAR(130) DETERMINISTIC
RETURN CONCAT('`',REPLACE(_identifier,'`','``'),'`');

set @field_rows = 'h8';
set @field_cols = 'h1';

SET @sql := CONCAT("SELECT 
          CONCAT('SELECT ",
        SQL_ESC(@field_rows),
        ",  ', GROUP_CONCAT(DISTINCT CONCAT('sum(IF(",
                   SQL_ESC(@field_cols),
        "=', QUOTE(",
        SQL_ESC(@field_cols),
        "),', 1,0)) AS ',SQL_ESC(",
        SQL_ESC(@field_cols),
        ") )), ' FROM  survey_results where ', SQL_ESC(@field_rows), ' != \"\" GROUP BY ",
        SQL_ESC(@field_rows),
        "')
     INTO   @sql
     FROM   survey_results
    where ", SQL_ESC(@field_cols), " != '' " 
  );

PREPARE stmt FROM @sql; 
EXECUTE stmt; 
DEALLOCATE PREPARE stmt;

PREPARE stmt FROM @sql; 
EXECUTE stmt; 
DEALLOCATE PREPARE stmt;
    
