# run the following command on the server to output the results into a csv file
# mysql -u root -p job-announcements < hr.gov.ge\ word\ analysis.sql


# სასიამოვნო გარეგნობ*
select 'hr.gov.ge', 'სასიამოვნო გარეგნობ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]სასიამოვნო გარეგნობ.*[[:>:]]' or additional_requirements regexp '[[:<:]]სასიამოვნო გარეგნობ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]სასიამოვნო გარეგნობ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]სასიამოვნო გარეგნობ.*[[:>:]]')

union

# გაწონასწორებულ* და არაკონფლიქტურ*
select 'hr.gov.ge', 'გაწონასწორებულ* და არაკონფლიქტურ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]გაწონასწორებულ.* და არაკონფლიქტურ.*[[:>:]]' or additional_requirements regexp '[[:<:]]გაწონასწორებულ.* და არაკონფლიქტურ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]გაწონასწორებულ.* და არაკონფლიქტურ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]გაწონასწორებულ.* და არაკონფლიქტურ.*[[:>:]]')

union

# გაწონასწორებულ*
select 'hr.gov.ge', 'გაწონასწორებულ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]გაწონასწორებულ.*[[:>:]]' or additional_requirements regexp '[[:<:]]გაწონასწორებულ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]გაწონასწორებულ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]გაწონასწორებულ.*[[:>:]]')

union

# არაკონფლიქტურ*
select 'hr.gov.ge', 'არაკონფლიქტურ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]არაკონფლიქტურ.*[[:>:]]' or additional_requirements regexp '[[:<:]]არაკონფლიქტურ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]არაკონფლიქტურ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]არაკონფლიქტურ.*[[:>:]]')

union

# დაოჯახებულ*
select 'hr.gov.ge', 'დაოჯახებულ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]დაოჯახებულ.*[[:>:]]' or additional_requirements regexp '[[:<:]]დაოჯახებულ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]დაოჯახებულ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]დაოჯახებულ.*[[:>:]]')

union

# დასაოჯახებელ*
select 'hr.gov.ge', 'დასაოჯახებელ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]დასაოჯახებელ.*[[:>:]]' or additional_requirements regexp '[[:<:]]დასაოჯახებელ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]დასაოჯახებელ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]დასაოჯახებელ.*[[:>:]]')

union

# გათხოვილ*
select 'hr.gov.ge', 'გათხოვილ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]გათხოვილ.*[[:>:]]' or additional_requirements regexp '[[:<:]]გათხოვილ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]გათხოვილ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]გათხოვილ.*[[:>:]]')

union

# გასათხოვარ*
select 'hr.gov.ge', 'გასათხოვარ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]გასათხოვარ.*[[:>:]]' or additional_requirements regexp '[[:<:]]გასათხოვარ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]გასათხოვარ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]გასათხოვარ.*[[:>:]]')

union

# უშვილო*
select 'hr.gov.ge', 'უშვილო*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]უშვილო.*[[:>:]]' or additional_requirements regexp '[[:<:]]უშვილო.*[[:>:]]' 
  or additional_info regexp '[[:<:]]უშვილო.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]უშვილო.*[[:>:]]')

union

# ქალიშვილ*
select 'hr.gov.ge', 'ქალიშვილ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]ქალიშვილ.*[[:>:]]' or additional_requirements regexp '[[:<:]]ქალიშვილ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]ქალიშვილ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]ქალიშვილ.*[[:>:]]')

union

# ქალბატონ*
select 'hr.gov.ge', 'ქალბატონ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]ქალბატონ.*[[:>:]]' or additional_requirements regexp '[[:<:]]ქალბატონ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]ქალბატონ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]ქალბატონ.*[[:>:]]')

union

# ახალგაზრდა გოგონა*
select 'hr.gov.ge', 'ახალგაზრდა გოგონა*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]ახალგაზრდა გოგონა.*[[:>:]]' or additional_requirements regexp '[[:<:]]ახალგაზრდა გოგონა.*[[:>:]]' 
  or additional_info regexp '[[:<:]]ახალგაზრდა გოგონა.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]ახალგაზრდა გოგონა.*[[:>:]]')

union

# ახალგაზრდა მამაკაც*
select 'hr.gov.ge', 'ახალგაზრდა მამაკაც*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]ახალგაზრდა მამაკაც.*[[:>:]]' or additional_requirements regexp '[[:<:]]ახალგაზრდა მამაკაც.*[[:>:]]' 
  or additional_info regexp '[[:<:]]ახალგაზრდა მამაკაც.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]ახალგაზრდა მამაკაც.*[[:>:]]')

union

# მამაკაც*
select 'hr.gov.ge', 'მამაკაც*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]მამაკაც.*[[:>:]]' or additional_requirements regexp '[[:<:]]მამაკაც.*[[:>:]]' 
  or additional_info regexp '[[:<:]]მამაკაც.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]მამაკაც.*[[:>:]]')

union

# ლამაზ*
select 'hr.gov.ge', 'ლამაზ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]ლამაზ.*[[:>:]]' or additional_requirements regexp '[[:<:]]ლამაზ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]ლამაზ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]ლამაზ.*[[:>:]]')

union

# სიმპატიურ*/სიმპათიურ*
select 'hr.gov.ge', 'სიმპატიურ*/სიმპათიურ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]სიმპატიურ.*[[:>:]]' or additional_requirements regexp '[[:<:]]სიმპატიურ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]სიმპატიურ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]სიმპატიურ.*[[:>:]]'
  or job_description regexp '[[:<:]]სიმპათიურ.*[[:>:]]' or additional_requirements regexp '[[:<:]]სიმპათიურ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]სიმპათიურ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]სიმპათიურ.*[[:>:]]')

union

# მომხიბვლელ*
select 'hr.gov.ge', 'მომხიბვლელ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]მომხიბვლელ.*[[:>:]]' or additional_requirements regexp '[[:<:]]მომხიბვლელ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]მომხიბვლელ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]მომხიბვლელ.*[[:>:]]')

union

# სტაბილურ*
select 'hr.gov.ge', 'სტაბილურ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]სტაბილურ.*[[:>:]]' or additional_requirements regexp '[[:<:]]სტაბილურ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]სტაბილურ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]სტაბილურ.*[[:>:]]')

union

# სტაბილურ* თანამშრომელ*
select 'hr.gov.ge', 'სტაბილურ* თანამშრომელ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]სტაბილურ.* თანამშრომელ.*[[:>:]]' or additional_requirements regexp '[[:<:]]სტაბილურ.* თანამშრომელ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]სტაბილურ.* თანამშრომელ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]სტაბილურ.* თანამშრომელ.*[[:>:]]')

union

# დაუოჯახებელ*
select 'hr.gov.ge', 'დაუოჯახებელ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]დაუოჯახებელ.*[[:>:]]' or additional_requirements regexp '[[:<:]]დაუოჯახებელ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]დაუოჯახებელ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]დაუოჯახებელ.*[[:>:]]')

union

# გაუთხოვარ*
select 'hr.gov.ge', 'გაუთხოვარ*', job_id, position, provided_by, deadline, category, location,
replace(replace(replace(CONCAT_WS('; ', job_description, additional_requirements, additional_info, qualifications_knowledge_legal_acts), '"', '\''), '\r\n', ' '), '\n', ' ') as job_text 
from jobs where locale = 'geo' and year(deadline) >= 2010
and (job_description regexp '[[:<:]]გაუთხოვარ.*[[:>:]]' or additional_requirements regexp '[[:<:]]გაუთხოვარ.*[[:>:]]' 
  or additional_info regexp '[[:<:]]გაუთხოვარ.*[[:>:]]' or qualifications_knowledge_legal_acts regexp '[[:<:]]გაუთხოვარ.*[[:>:]]')

# write into a file
INTO OUTFILE '/tmp/hr.gov.ge\ word\ analysis.csv'
FIELDS TERMINATED BY '\t'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'

