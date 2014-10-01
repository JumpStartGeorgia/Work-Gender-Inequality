# run the following command on the server to output the results into a csv file
# mysql -u root -p jobs.ge < jobs.ge\ word\ analysis.sql

# სასიამოვნო გარეგნობ*
select 'jobs.ge', 'სასიამოვნო გარეგნობ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]სასიამოვნო გარეგნობ.*[[:>:]]'

union

# გაწონასწორებულ* და არაკონფლიქტურ*
select 'jobs.ge', 'გაწონასწორებულ* და არაკონფლიქტურ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]გაწონასწორებულ.* და არაკონფლიქტურ.*[[:>:]]'

union

# გაწონასწორებულ*
select 'jobs.ge', 'გაწონასწორებულ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]გაწონასწორებულ.*[[:>:]]'

union

# არაკონფლიქტურ*
select 'jobs.ge', 'არაკონფლიქტურ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]არაკონფლიქტურ.*[[:>:]]'

union

# დაოჯახებულ*
select 'jobs.ge', 'დაოჯახებულ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]დაოჯახებულ.*[[:>:]]'

union

# დასაოჯახებელ*
select 'jobs.ge', 'დასაოჯახებელ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]დასაოჯახებელ.*[[:>:]]'

union

# გათხოვილ*
select 'jobs.ge', 'გათხოვილ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]გათხოვილ.*[[:>:]]'

union

# გასათხოვარ*
select 'jobs.ge', 'გასათხოვარ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]გასათხოვარ.*[[:>:]]'

union

# უშვილო*
select 'jobs.ge', 'უშვილო*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]უშვილო.*[[:>:]]'

union

# ქალიშვილ*
select 'jobs.ge', 'ქალიშვილ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]ქალიშვილ.*[[:>:]]'

union

# ქალბატონ*
select 'jobs.ge', 'ქალბატონ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]ქალბატონ.*[[:>:]]'

union

# ახალგაზრდა გოგონა*
select 'jobs.ge', 'ახალგაზრდა გოგონა*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]ახალგაზრდა გოგონა.*[[:>:]]'

union

# ახალგაზრდა მამაკაც*
select 'jobs.ge', 'ახალგაზრდა მამაკაც*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]ახალგაზრდა მამაკაც.*[[:>:]]'

union

# მამაკაც*
select 'jobs.ge', 'მამაკაც*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]მამაკაც.*[[:>:]]'

union

# ლამაზ*
select 'jobs.ge', 'ლამაზ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]ლამაზ.*[[:>:]]'

union

# სიმპატიურ*/სიმპათიურ*
select 'jobs.ge', 'სიმპატიურ*/სიმპათიურ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and (jobtext_ge regexp '[[:<:]]სიმპატიურ.*[[:>:]]' or jobtext_ge regexp '[[:<:]]სიმპათიურ.*[[:>:]]')

union

# მომხიბვლელ*
select 'jobs.ge', 'მომხიბვლელ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]მომხიბვლელ.*[[:>:]]'

union

# სტაბილურ*
select 'jobs.ge', 'სტაბილურ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]სტაბილურ.*[[:>:]]'

union

# სტაბილურ* თანამშრომელ*
select 'jobs.ge', 'სტაბილურ* თანამშრომელ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]სტაბილურ.* თანამშრომელ.*[[:>:]]'

union

# დაუოჯახებელ*
select 'jobs.ge', 'დაუოჯახებელ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]დაუოჯახებელ.*[[:>:]]'

union

# გაუთხოვარ*
select 'jobs.ge', 'გაუთხოვარ*', id, title_ge, employer_ge, date(published), 
concat(if(cat_law = 1, 'Law, ', ''), if(cat_finance = 1, 'Finance, ', ''), if(cat_admin = 1, 'Administration/Management, ', ''), 
  if(cat_it = 1, 'Informaton Technologies, ', ''), if(cat_technical = 1, 'Technical/Logistics, ', ''), if(cat_prmarketing = 1, 'PR/Marketing, ', ''), 
	if(cat_sales = 1, 'Sales, ', ''), if(cat_healthcare = 1, 'Health, ', ''), if(cat_other = 1, 'Other, ', '')) as category, location_ge,
replace(replace(replace(replace(replace(replace(jobtext_ge, '"', '\''), '\r\n', ' '), '\n', ' '), '<b>', ''), '</b>', ''), '<br />', '') as job_text
from jobs
where year(published) >= 2010
and jobtext_ge regexp '[[:<:]]გაუთხოვარ.*[[:>:]]'

# write into a file
INTO OUTFILE '/tmp/jobs.ge\ word\ analysis.csv'
FIELDS TERMINATED BY '\t'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'

