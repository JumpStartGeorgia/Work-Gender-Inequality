require 'csv'

eq_values = []

# read in the equation values
# format: category, female slope, female intercept, male slope, male intercept
eq_values = CSV.read('gender_pay_gap_eq.csv')
# remove the header row
eq_values.delete_at(0)

female = []
male = []
difference = []

# calculate the sum of salaries over the next 60 years
eq_values.each do |category|
  mrow = []
  frow = []
  drow = []
  fsum = 0
  msum = 0
  diff = 0

  mrow << category[0]
  frow << category[0]
  drow << category[0]

  # for 18 to 65 years
  (0..46).each_with_index do |year, year_index|
    (1..4).each do |quarter|  
      # female
      fsum += 3*(category[1].to_f*(4*year+quarter) + category[2].to_f)
      
      # male
      msum += 3*(category[3].to_f*(4*year+quarter) + category[4].to_f)
    end
    
    if year_index % 5 == 0 || year_index == 46
      mrow << msum.round(2)
      frow << fsum.round(2)
      drow << (msum-fsum).round(2)
    end
  end  
  female << frow
  male << mrow
  difference << drow
end

# write out to csv
header = ['category']
(0..10).each_with_index do |year, index|
  if index == 10
    header << 47
  else
    header << year*5
  end
end

CSV.open('gender_pay_gap_female_sum.csv', 'w') do |csv|
  csv << header
  female.each do |row|
    csv << row
  end
end
CSV.open('gender_pay_gap_male_sum.csv', 'w') do |csv|
  csv << header
  male.each do |row|
    csv << row
  end
end
CSV.open('gender_pay_gap_difference_sum.csv', 'w') do |csv|
  csv << header
  difference.each do |row|
    csv << row
  end
end

