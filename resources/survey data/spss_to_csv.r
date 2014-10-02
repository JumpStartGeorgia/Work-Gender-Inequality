#! /usr/bin/env Rscript

# three required arguments:
# - 1: spss file to read in
# - 2: csv file to save raw data to
# - 3: spss file to save variable codes to
# - 4: csv file containing variable code and question

# take in the arguments
args <- commandArgs(TRUE)

print(paste('spss file to read in = ', args[1]))
print(paste('csv file for data = ', args[2]))
print(paste('spss file for codes = ', args[3]))
print(paste('csv file for questions labels = ', args[3]))

# read in spss
# - need value.label to be true so that label values are available on export
data <- read.spss(args[1], use.value.label=T, to.data.frame=T)

# basic spss export
#write.foreign(data, 'out.csv', 'code.sps', package="SPSS")
# if get error: cannot abbreviate the variable names to eight or fewer letters
# switch to:
foreign:::writeForeignSPSS(data, args[2], args[3], varnames=names(data))
#foreign:::writeForeignSPSS(data, args[2], args[3], varnames=attr(data, 'variable.labels'))

# write out the question labels
write.csv(attr(data, 'variable.labels'), args[4])

# quit
q()
