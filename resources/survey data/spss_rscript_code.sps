DATA LIST FILE= "spss_rscript_out.csv"  free (",")
/ N Interv_code Reg start_time fin_time date A1 A2 A3 A3.1_1 A3.1_2 A3.1_3 A3.2 A3.3 A4 A4.1 A4.2 A5 A5.1 A6 A7 A8 A9 A10 A11 A12 A13 B1 B1.1 B1.2_1 B1.2_2 B1.2_3 B1.2_4 B1.2_5 B1.2_6 B2 B3 B3.1 B3.2_1 B3.2_2 B3.2_3 B3.2_4 B3.2_5 B3.2_6 B3.2_7 B3.2_8 B3.2_9 B3.2_10 B3.2_11 B3.2_12 B3.2_13 B3.2_14 B3.3_1 B3.3_2 B3.3_3 B3.3_4 B3.3_5 B3.3_6 B3.3_7 B3.3_8 B3.3_9 B3.3_10 B3.3_11 B3.3_12 B3.3_13 B3.3_14 B4 B4.1_1 B4.1_2 B4.1_3 B4.1_4 B5_1 B5_2 B5_3 B5_4 B5_5 B6_1 B6_2 B6_3 B6_4 B6_5 B6_6 C1 C1.1 C1.2 C1.3 C1.3.1_1 C1.3.1_2 C1.3.1_3 C1.3.1_4 C1.3.1_5 C1.3.1_6 C1.3.1_7 C1.3.1_8 C1.3.1_9 C1.3.1_10 C1.3.1_11 C1.3.2_1 C1.3.2_2 C1.3.2_3 C1.3.2_4 C1.3.2_5 C2 C3 C3.1 C3.2 C4 C4.1 C4.1.1 C4.2 D1 D1.1 D1.2 D1.3 D1.3.1_1 D1.3.1_2 D1.3.1_3 D1.3.1_4 D1.3.1_5 D1.3.1_6 D1.3.1_7 D1.3.1_8 D1.3.1_9 D1.3.1_10 D1.3.1_11 D1.3.1_12 D1.3.2 D1.3.3_1 D1.3.3_2 D1.3.3_3 D1.3.3_4 D1.3.3_5 D1.3.3_6 D1.3.3_7 D1.3.3_8 D1.3.3_9 D1.3.3_10 D1.3.3_11 D1.3.3_12 D1.4 D2 E1 E1.1_1 E1.1_2 E1.1_3 E1.1_4 E1.1_5 E1.1_6 E1.1_7 E1.1_8 E1.1_9 E1.1_10 E1.1_11 E1.1_12 E2_1 E2_2 E3_1 E3_2 E3_3 E3_4 E3_5 E3_6 E3_7 F1_1 F1_2 F2_1 F2_2 F2_3 F2_4 F2_5 F2_6 F2_7 F2_8 F3 F3.1 F4 G1_1 G1_2 G1_3 G1_4 G1_5 G2 G3 G4_1 G4_2 G4_3 G4_4 G4_5 G4_6 G4_7 G4_8 G4_9 G4_10 G4_11 G4_12 G4_13 G4_14 G4_15 G4_16 G5_1 G5_2 G5_3 G5_4 G5_5 G5_6 G5_7 G5_8 G5_9 G6 G7_1 G7_2 G7_3 G7_4 G7_5 G7_6 G7_7 G7_8 G7_9 G7_10 G7_11 G7_12 G7_13 G7_14 G7_15 G7_16 G8 G8.1 G8.2 G8.3 G8.3.1_1 G8.3.1_2 G8.3.1_3 G8.3.1_4 G8.3.1_5 G8.3.1_6 G8.3.1_7 G8.3.1_8 G8.3.2_1 G8.3.2_2 G8.3.2_3 G8.3.2_4 G8.3.2_5 G8.4_1 G8.4_2 G8.4_3 G8.4_4 G8.4_5 G8.4_6 G8.4_7 G8.4_8 G8.4_9 G8.4_10 G8.4_11 H1 H2 H3 H4_1 H4_2 H4.1 H5 H6 H7 H8 H9 H10_1 H10_2 H10_3 H10_4 Envelope  .

VARIABLE LABELS
N "N" 
 Interv_code "Interv_code" 
 Reg "Reg" 
 start_time "start_time" 
 fin_time "fin_time" 
 date "date" 
 A1 "A1" 
 A2 "A2" 
 A3 "A3" 
 A3.1_1 "A3.1_1" 
 A3.1_2 "A3.1_2" 
 A3.1_3 "A3.1_3" 
 A3.2 "A3.2" 
 A3.3 "A3.3" 
 A4 "A4" 
 A4.1 "A4.1" 
 A4.2 "A4.2" 
 A5 "A5" 
 A5.1 "A5.1" 
 A6 "A6" 
 A7 "A7" 
 A8 "A8" 
 A9 "A9" 
 A10 "A10" 
 A11 "A11" 
 A12 "A12" 
 A13 "A13" 
 B1 "B1" 
 B1.1 "B1.1" 
 B1.2_1 "B1.2_1" 
 B1.2_2 "B1.2_2" 
 B1.2_3 "B1.2_3" 
 B1.2_4 "B1.2_4" 
 B1.2_5 "B1.2_5" 
 B1.2_6 "B1.2_6" 
 B2 "B2" 
 B3 "B3" 
 B3.1 "B3.1" 
 B3.2_1 "B3.2_1" 
 B3.2_2 "B3.2_2" 
 B3.2_3 "B3.2_3" 
 B3.2_4 "B3.2_4" 
 B3.2_5 "B3.2_5" 
 B3.2_6 "B3.2_6" 
 B3.2_7 "B3.2_7" 
 B3.2_8 "B3.2_8" 
 B3.2_9 "B3.2_9" 
 B3.2_10 "B3.2_10" 
 B3.2_11 "B3.2_11" 
 B3.2_12 "B3.2_12" 
 B3.2_13 "B3.2_13" 
 B3.2_14 "B3.2_14" 
 B3.3_1 "B3.3_1" 
 B3.3_2 "B3.3_2" 
 B3.3_3 "B3.3_3" 
 B3.3_4 "B3.3_4" 
 B3.3_5 "B3.3_5" 
 B3.3_6 "B3.3_6" 
 B3.3_7 "B3.3_7" 
 B3.3_8 "B3.3_8" 
 B3.3_9 "B3.3_9" 
 B3.3_10 "B3.3_10" 
 B3.3_11 "B3.3_11" 
 B3.3_12 "B3.3_12" 
 B3.3_13 "B3.3_13" 
 B3.3_14 "B3.3_14" 
 B4 "B4" 
 B4.1_1 "B4.1_1" 
 B4.1_2 "B4.1_2" 
 B4.1_3 "B4.1_3" 
 B4.1_4 "B4.1_4" 
 B5_1 "B5_1" 
 B5_2 "B5_2" 
 B5_3 "B5_3" 
 B5_4 "B5_4" 
 B5_5 "B5_5" 
 B6_1 "B6_1" 
 B6_2 "B6_2" 
 B6_3 "B6_3" 
 B6_4 "B6_4" 
 B6_5 "B6_5" 
 B6_6 "B6_6" 
 C1 "C1" 
 C1.1 "C1.1" 
 C1.2 "C1.2" 
 C1.3 "C1.3" 
 C1.3.1_1 "C1.3.1_1" 
 C1.3.1_2 "C1.3.1_2" 
 C1.3.1_3 "C1.3.1_3" 
 C1.3.1_4 "C1.3.1_4" 
 C1.3.1_5 "C1.3.1_5" 
 C1.3.1_6 "C1.3.1_6" 
 C1.3.1_7 "C1.3.1_7" 
 C1.3.1_8 "C1.3.1_8" 
 C1.3.1_9 "C1.3.1_9" 
 C1.3.1_10 "C1.3.1_10" 
 C1.3.1_11 "C1.3.1_11" 
 C1.3.2_1 "C1.3.2_1" 
 C1.3.2_2 "C1.3.2_2" 
 C1.3.2_3 "C1.3.2_3" 
 C1.3.2_4 "C1.3.2_4" 
 C1.3.2_5 "C1.3.2_5" 
 C2 "C2" 
 C3 "C3" 
 C3.1 "C3.1" 
 C3.2 "C3.2" 
 C4 "C4" 
 C4.1 "C4.1" 
 C4.1.1 "C4.1.1" 
 C4.2 "C4.2" 
 D1 "D1" 
 D1.1 "D1.1" 
 D1.2 "D1.2" 
 D1.3 "D1.3" 
 D1.3.1_1 "D1.3.1_1" 
 D1.3.1_2 "D1.3.1_2" 
 D1.3.1_3 "D1.3.1_3" 
 D1.3.1_4 "D1.3.1_4" 
 D1.3.1_5 "D1.3.1_5" 
 D1.3.1_6 "D1.3.1_6" 
 D1.3.1_7 "D1.3.1_7" 
 D1.3.1_8 "D1.3.1_8" 
 D1.3.1_9 "D1.3.1_9" 
 D1.3.1_10 "D1.3.1_10" 
 D1.3.1_11 "D1.3.1_11" 
 D1.3.1_12 "D1.3.1_12" 
 D1.3.2 "D1.3.2" 
 D1.3.3_1 "D1.3.3_1" 
 D1.3.3_2 "D1.3.3_2" 
 D1.3.3_3 "D1.3.3_3" 
 D1.3.3_4 "D1.3.3_4" 
 D1.3.3_5 "D1.3.3_5" 
 D1.3.3_6 "D1.3.3_6" 
 D1.3.3_7 "D1.3.3_7" 
 D1.3.3_8 "D1.3.3_8" 
 D1.3.3_9 "D1.3.3_9" 
 D1.3.3_10 "D1.3.3_10" 
 D1.3.3_11 "D1.3.3_11" 
 D1.3.3_12 "D1.3.3_12" 
 D1.4 "D1.4" 
 D2 "D2" 
 E1 "E1" 
 E1.1_1 "E1.1_1" 
 E1.1_2 "E1.1_2" 
 E1.1_3 "E1.1_3" 
 E1.1_4 "E1.1_4" 
 E1.1_5 "E1.1_5" 
 E1.1_6 "E1.1_6" 
 E1.1_7 "E1.1_7" 
 E1.1_8 "E1.1_8" 
 E1.1_9 "E1.1_9" 
 E1.1_10 "E1.1_10" 
 E1.1_11 "E1.1_11" 
 E1.1_12 "E1.1_12" 
 E2_1 "E2_1" 
 E2_2 "E2_2" 
 E3_1 "E3_1" 
 E3_2 "E3_2" 
 E3_3 "E3_3" 
 E3_4 "E3_4" 
 E3_5 "E3_5" 
 E3_6 "E3_6" 
 E3_7 "E3_7" 
 F1_1 "F1_1" 
 F1_2 "F1_2" 
 F2_1 "F2_1" 
 F2_2 "F2_2" 
 F2_3 "F2_3" 
 F2_4 "F2_4" 
 F2_5 "F2_5" 
 F2_6 "F2_6" 
 F2_7 "F2_7" 
 F2_8 "F2_8" 
 F3 "F3" 
 F3.1 "F3.1" 
 F4 "F4" 
 G1_1 "G1_1" 
 G1_2 "G1_2" 
 G1_3 "G1_3" 
 G1_4 "G1_4" 
 G1_5 "G1_5" 
 G2 "G2" 
 G3 "G3" 
 G4_1 "G4_1" 
 G4_2 "G4_2" 
 G4_3 "G4_3" 
 G4_4 "G4_4" 
 G4_5 "G4_5" 
 G4_6 "G4_6" 
 G4_7 "G4_7" 
 G4_8 "G4_8" 
 G4_9 "G4_9" 
 G4_10 "G4_10" 
 G4_11 "G4_11" 
 G4_12 "G4_12" 
 G4_13 "G4_13" 
 G4_14 "G4_14" 
 G4_15 "G4_15" 
 G4_16 "G4_16" 
 G5_1 "G5_1" 
 G5_2 "G5_2" 
 G5_3 "G5_3" 
 G5_4 "G5_4" 
 G5_5 "G5_5" 
 G5_6 "G5_6" 
 G5_7 "G5_7" 
 G5_8 "G5_8" 
 G5_9 "G5_9" 
 G6 "G6" 
 G7_1 "G7_1" 
 G7_2 "G7_2" 
 G7_3 "G7_3" 
 G7_4 "G7_4" 
 G7_5 "G7_5" 
 G7_6 "G7_6" 
 G7_7 "G7_7" 
 G7_8 "G7_8" 
 G7_9 "G7_9" 
 G7_10 "G7_10" 
 G7_11 "G7_11" 
 G7_12 "G7_12" 
 G7_13 "G7_13" 
 G7_14 "G7_14" 
 G7_15 "G7_15" 
 G7_16 "G7_16" 
 G8 "G8" 
 G8.1 "G8.1" 
 G8.2 "G8.2" 
 G8.3 "G8.3" 
 G8.3.1_1 "G8.3.1_1" 
 G8.3.1_2 "G8.3.1_2" 
 G8.3.1_3 "G8.3.1_3" 
 G8.3.1_4 "G8.3.1_4" 
 G8.3.1_5 "G8.3.1_5" 
 G8.3.1_6 "G8.3.1_6" 
 G8.3.1_7 "G8.3.1_7" 
 G8.3.1_8 "G8.3.1_8" 
 G8.3.2_1 "G8.3.2_1" 
 G8.3.2_2 "G8.3.2_2" 
 G8.3.2_3 "G8.3.2_3" 
 G8.3.2_4 "G8.3.2_4" 
 G8.3.2_5 "G8.3.2_5" 
 G8.4_1 "G8.4_1" 
 G8.4_2 "G8.4_2" 
 G8.4_3 "G8.4_3" 
 G8.4_4 "G8.4_4" 
 G8.4_5 "G8.4_5" 
 G8.4_6 "G8.4_6" 
 G8.4_7 "G8.4_7" 
 G8.4_8 "G8.4_8" 
 G8.4_9 "G8.4_9" 
 G8.4_10 "G8.4_10" 
 G8.4_11 "G8.4_11" 
 H1 "H1" 
 H2 "H2" 
 H3 "H3" 
 H4_1 "H4_1" 
 H4_2 "H4_2" 
 H4.1 "H4.1" 
 H5 "H5" 
 H6 "H6" 
 H7 "H7" 
 H8 "H8" 
 H9 "H9" 
 H10_1 "H10_1" 
 H10_2 "H10_2" 
 H10_3 "H10_3" 
 H10_4 "H10_4" 
 Envelope "Envelope" 
 .

VALUE LABELS
/
Reg 
1 "Achara" 
 2 "Guria" 
 3 "Tbilisi" 
 4 "Imereti" 
 5 "Kakheti" 
 6 "Mtskheta-Mtianeti" 
 7 "Samegrelo" 
 8 "Samtskhe-Javakheti" 
 9 "Qvemo Qartli" 
 10 "Shita Qartli" 
/
A1 
1 "employed" 
 2 "temporarily not working because of temporary illness/parental leave/vacation/" 
 3 "self-employed" 
 4 "unemployed" 
/
A2 
1 "yes" 
 2 "no" 
/
A3 
1 "yes" 
 2 "Yes, with one/some of my employers (in case of having many jobs)" 
 3 "No" 
/
A3.1_3 
1 "yes" 
 2 "no" 
 3 "limited time frame" 
 4 "filter" 
/
A3.2 
1 "yes" 
 2 "no" 
 3 "I don't know" 
 4 "filter" 
/
A5.1 
1 "Tbilisi" 
 2 "Suburbs or outskirts of Tbilisi" 
 3 "town" 
 4 "village" 
 5 "farm or home in the countryside" 
 6 "filter" 
/
A10 
1 "Yes, I would like to have more women among my colleagues" 
 2 "Yes, I would like to have more men among my colleagues" 
 3 "3.	I would like, but men/women couldn’t do the work" 
 4 "No I like it as it is" 
 5 "I don't care" 
 6 "other" 
/
A11 
1 "with women" 
 2 "with men" 
 3 "Both men and women" 
/
A12 
1 "male" 
 2 "female" 
 3 "I don't have one" 
/
A13 
1 "Yes, currently" 
 2 "Yes, previously but not currently" 
 3 "No, never" 
/
B1.1 
1 "once" 
 2 "2-4 times" 
 3 "5-7 times" 
 4 "8-10 times" 
 5 "More than 10 times" 
 6 "don't remember" 
 7 "filter" 
/
B1.2_1 
1 "yes" 
 2 "no" 
 3 "N/A" 
 4 "filter" 
/
B1.2_2 
1 "yes" 
 2 "no" 
 3 "N/A" 
 4 "filter" 
/
B3.2_1 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.2_2 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.2_3 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.2_4 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.2_5 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.2_6 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.2_7 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.2_8 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.2_9 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.2_10 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.2_11 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.2_12 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.2_13 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.2_14 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.3_1 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.3_2 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.3_3 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.3_4 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.3_5 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.3_6 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.3_7 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.3_8 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.3_9 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.3_10 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B3.3_11 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B4.1_1 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B4.1_2 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B4.1_3 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B4.1_4 
1 "yes" 
 2 "no" 
 3 "filter" 
/
B6_1 
1 "yes" 
 2 "no" 
/
B6_2 
1 "yes" 
 2 "no" 
/
B6_3 
1 "yes" 
 2 "no" 
/
B6_4 
1 "yes" 
 2 "no" 
/
B6_5 
1 "yes" 
 2 "no" 
/
B6_6 
1 "yes" 
 2 "no" 
/
C1 
1 "yes" 
 2 "no" 
 3 "I work here less than 3 months and have no such experience so far" 
/
C1.1 
1 "I applied for the job/promotion" 
 2 "I was offered the higher position" 
 3 "other" 
 4 "filter" 
/
C1.2 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3.1_1 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3.1_2 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3.1_3 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3.1_4 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3.1_5 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3.1_6 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3.1_7 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3.1_8 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3.2_1 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3.2_2 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3.2_3 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3.2_4 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C1.3.2_5 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C2 
1 "yes" 
 2 "no" 
 3 "other" 
 4 "filter" 
/
C3 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C3.1 
1 "Mine, I asked for promotion" 
 2 "It was general pay rise for all of the employees" 
 3 "It was my manager’s initiative" 
 4 "other" 
 5 "filter" 
/
C4 
1 "yes" 
 2 "no" 
 3 "filter" 
/
C4.1.1 
1 "I did not want to" 
 2 "The time of the training wasn’t convenient for me" 
 3 "I was not allowed by my employer, please specify" 
 4 "I missed it" 
 5 "other" 
 6 "filter" 
/
C4.2 
1 "Yes, but my employer doesn’t provide trainings for employees" 
 2 "Yes, but my employer didn’t let/offer me go to the training" 
 3 "No, there are no trainings in our field" 
 4 "no" 
 5 "filter" 
/
D1.1 
1 "no" 
 2 "Yes, once" 
 3 "Yes, more than once" 
 4 "filter" 
/
D1.3 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.1_1 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.1_2 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.1_3 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.1_4 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.1_5 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.1_6 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.1_7 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.1_8 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.1_9 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.1_10 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.1_11 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.1_12 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.2 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.3_1 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.3_2 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.3_3 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.3_4 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.3_5 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.3_6 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.3_7 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.3_8 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.3_9 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.3_10 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.3_11 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.3.3_12 
1 "yes" 
 2 "no" 
 3 "filter" 
/
D1.4 
1 "I don’t think the firing was unreasonable" 
 2 "No, I did not contact/appeal to anyone or any institution" 
 3 "Yes, I appealed to organization board" 
 4 "Yes, I contacted/appealed to trade union" 
 5 "Yes, I appealed /contacted" 
 6 "filter" 
/
E1.1_1 
1 "yes" 
 2 "no" 
 3 "filter" 
/
E1.1_2 
1 "yes" 
 2 "no" 
 3 "filter" 
/
E1.1_3 
1 "yes" 
 2 "no" 
 3 "filter" 
/
E1.1_4 
1 "yes" 
 2 "no" 
 3 "filter" 
/
E1.1_5 
1 "yes" 
 2 "no" 
 3 "filter" 
/
E1.1_6 
1 "yes" 
 2 "no" 
 3 "filter" 
/
E1.1_7 
1 "yes" 
 2 "no" 
 3 "filter" 
/
E1.1_8 
1 "yes" 
 2 "no" 
 3 "filter" 
/
E1.1_9 
1 "yes" 
 2 "no" 
 3 "filter" 
/
E1.1_10 
1 "yes" 
 2 "no" 
 3 "filter" 
/
E1.1_11 
1 "yes" 
 2 "no" 
 3 "filter" 
/
E2_1 
1 "none" 
 2 "once" 
 3 "twice" 
 4 "three times and more" 
/
E2_2 
1 "none" 
 2 "once" 
 3 "twice" 
 4 "three times and more" 
/
E3_1 
1 "n.a" 
 2 "I don't know" 
 3 "disagree" 
 4 "agree" 
/
E3_2 
1 "n.a." 
 2 "I don't know" 
 3 "disagree" 
 4 "agree" 
/
E3_3 
1 "n.a" 
 2 "I don't know" 
 3 "disagree" 
 4 "agree" 
/
E3_4 
1 "n.a" 
 2 "I don't know" 
 3 "disagree" 
 4 "agree" 
/
E3_7 
1 "n.a" 
 2 "I don't know" 
 3 "disagree" 
 4 "agree" 
/
F2_2 
1 "N/A" 
 2 "yes" 
 3 "no" 
/
F2_3 
1 "N/A" 
 2 "yes" 
 3 "no" 
/
F2_4 
1 "N/A" 
 2 "yes" 
 3 "no" 
/
F2_5 
1 "N/A" 
 2 "yes" 
 3 "no" 
/
F2_6 
1 "N/A" 
 2 "yes" 
 3 "no" 
/
F2_7 
1 "N/A" 
 2 "yes" 
 3 "no" 
/
F2_8 
1 "N/A" 
 2 "yes" 
 3 "no" 
/
F3.1 
1 "yes, always" 
 2 "in most cases" 
 3 "sometimes" 
 4 "never" 
 5 "filter" 
/
F4 
1 "The question is irrelevant" 
 2 "positively" 
 3 "I couldn’t be on parental leave as long as I wanted" 
 4 "I have got fired because of that" 
 5 "When returning from parental leave I had to start working in lower position" 
 6 "When returning from parental leave I got promoted" 
 7 "When returning from parental leave I could work only part time (although I would have liked to work full time)" 
 8 "I quitted my job on my own will" 
 9 "other" 
/
G1_1 
1 "I don't know" 
 2 "disctimination" 
 3 "unpleasant" 
 4 "accaptable" 
/
G1_2 
1 "I don't know" 
 2 "disctimination" 
 3 "unpleasant" 
 4 "accaptable" 
/
G1_3 
1 "I don't know" 
 2 "disctimination" 
 3 "unpleasant" 
 4 "accaptable" 
/
G1_4 
1 "I don't know" 
 2 "disctimination" 
 3 "unpleasant" 
 4 "accaptable" 
/
G1_5 
1 "I don't know" 
 2 "discrimination" 
 3 "unpleasant" 
 4 "accaptable" 
/
G3 
1 "yes" 
 2 "no" 
 3 "I don't know" 
 4 "I don'w want to answer" 
 5 "filter" 
/
G4_1 
1 "It would be unpleasant" 
 2 "It whould not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Can't imagine" 
/
G4_2 
1 "it would be unpleasant" 
 2 "it would  not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Can't imagine" 
/
G4_3 
1 "it would be unpleasant" 
 2 "it would  not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Can't imagine" 
/
G4_4 
1 "it would be unpleasant" 
 2 "it would  not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Can't imagine" 
/
G4_5 
1 "it would be unpleasant" 
 2 "it would not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Can't  imagine" 
/
G4_6 
1 "it would be unpleasant" 
 2 "it would not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Can't imagine" 
/
G4_7 
1 "it would be unpleasant" 
 2 "it would  not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Can't imagine" 
/
G4_8 
1 "it would be unpleasant" 
 2 "it would  not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Cant imagine" 
/
G4_9 
1 "it would be unpleasant" 
 2 "it would  not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Can't imagine" 
/
G4_10 
1 "it would be unpleasant" 
 2 "it would  not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Can't imagine" 
/
G4_11 
1 "it would be unpleasant" 
 2 "it would  not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Can't imagine" 
/
G4_12 
1 "it would be unpleasant" 
 2 "it would  not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Can't imagine" 
/
G4_13 
1 "it would be unpleasant" 
 2 "it would  not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Can't imagine" 
/
G4_14 
1 "it would be unpleasant" 
 2 "it would  not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "can't imagine" 
/
G4_15 
1 "it would be unpleasant" 
 2 "it would  not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "Can't imagine" 
/
G4_16 
1 "it would be unpleasant" 
 2 "it would  not be unpleasant" 
 3 "It depends who would behave like that" 
 4 "can't imagine" 
/
G5_1 
1 "yes" 
 2 "no" 
/
G5_2 
1 "yes" 
 2 "no" 
/
G5_3 
1 "yes" 
 2 "no" 
/
G5_4 
1 "yes" 
 2 "no" 
/
G5_5 
1 "yes" 
 2 "no" 
/
G5_6 
1 "yes" 
 2 "no" 
/
G5_7 
1 "yes" 
 2 "no" 
/
G5_8 
1 "yes" 
 2 "no" 
/
G5_9 
1 "yes" 
 2 "no" 
/
G6 
1 "yes" 
 2 "no" 
 3 "I don't know" 
/
G7_1 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G7_2 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G7_3 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G7_4 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G7_5 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G7_6 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G7_7 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G7_8 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G7_9 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G7_10 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G7_12 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G7_13 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G7_15 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G7_16 
1 "yes" 
 2 "no" 
 3 "refuse" 
/
G8.1 
1 "yes" 
 2 "no" 
 3 "I don't know" 
 4 "filter" 
/
G8.2 
1 "once" 
 2 "2-4 times" 
 3 "5 or more times" 
 4 "the situation continues" 
 5 "I don't know" 
 6 "filter" 
/
G8.3 
1 "yes" 
 2 "no" 
 3 "filter" 
/
G8.3.1_4 
1 "yes" 
 2 "no" 
 3 "filter" 
/
G8.3.1_6 
1 "yes" 
 2 "no" 
 3 "filter" 
/
G8.4_1 
1 "yes" 
 2 "no" 
 3 "filter" 
/
G8.4_2 
1 "yes" 
 2 "no" 
 3 "filter" 
/
G8.4_3 
1 "yes" 
 2 "no" 
 3 "filter" 
/
G8.4_4 
1 "yes" 
 2 "no" 
 3 "filter" 
/
G8.4_5 
1 "yes" 
 2 "no" 
 3 "filter" 
/
G8.4_6 
1 "yes" 
 2 "no" 
 3 "filter" 
/
G8.4_7 
1 "yes" 
 2 "no" 
 3 "filter" 
/
G8.4_8 
1 "yes" 
 2 "no" 
 3 "filter" 
/
G8.4_9 
1 "yes" 
 2 "no" 
 3 "filter" 
/
G8.4_10 
1 "yes" 
 2 "no" 
 3 "filter" 
/
G8.4_11 
1 "yes" 
 2 "no" 
 3 "filter" 
/
H1 
1 "female" 
 2 "male" 
/
H2 
1 "18-25" 
 2 "26-35" 
 3 "36-45" 
 4 "46-55" 
 5 "56-65" 
 6 "65+" 
/
H3 
1 "Tbilisi" 
 2 "The suburbs or outskirts of Tbilisi" 
 3 "Town" 
 4 "Acountry village" 
 5 "A farm or home in the countryside" 
/
H4.1 
1 "Pre-primary education" 
 2 "Secondary school level" 
 3 "Vocational education on the basis of secondary education" 
 4 "BA student" 
 5 "MA student" 
 6 "PhD student" 
 7 "Higher vocational education" 
 8 "Bachelor degree" 
 9 "Master’s degree" 
 10 "PhD" 
 11 "Soviet educatio" 
 12 "other" 
/
H5 
1 "Married" 
 2 "Having stable partner" 
 3 "I don'w live with spouse but still legally married" 
 4 "divorced" 
 5 "widowed" 
 6 "I have never been married" 
/
H7 
1 "no religion" 
 2 "orthodox" 
 3 "grigorian" 
 4 "catholic" 
 5 "protestant" 
 6 "other christians" 
 7 "muslin" 
 8 "other religions" 
/
H8 
1 "up to 130 GEL" 
 2 "130-250 GEL" 
 3 "251-400 GEL" 
 4 "401-700 GEL" 
 5 "701-1000 GEL" 
 6 "1001-1300 GEL" 
 7 "1301-2000 GEL" 
 8 "more than 2000 GEL" 
 9 "I can't answer" 
 10 "refuse to answer" 
/
H9 
1 "I don't have a spouse" 
 2 "He/she doesn't work" 
 3 "on daily basis" 
 4 "retired" 
 5 "I don't know" 
 6 "up to 130 GEL" 
 7 "130-250 GEL" 
 8 "251-400 GEL" 
 9 "401-700 GEL" 
 10 "701-1000 GEL" 
 11 "1001-1300 GEL" 
 12 "1301-2000 GEL" 
 13 "more than 2000 GEL" 
 14 "difficult to answer" 
 15 "refure to answer" 
.

EXECUTE.
