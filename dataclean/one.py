import pandas as pd 
import numpy as np  
from pandas.tools.plotting import scatter_matrix
import matplotlib.pyplot as plt
from sklearn import model_selection
from sklearn.metrics import classification_report
from sklearn.metrics import confusion_matrix
from sklearn.metrics import accuracy_score
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.naive_bayes import GaussianNB


# jan2017 = "/Users/christine/Desktop/flights/2017/jan2017.csv"
# feb2017 = "/Users/christine/Desktop/flights/2017/feb2017.csv"
# mar2017 = "/Users/christine/Desktop/flights/2017/mar2017.csv"
# apr2017 = "/Users/christine/Desktop/flights/2017/apr2017.csv"
# may2017 = "/Users/christine/Desktop/flights/2017/may2017.csv"
# jun2017 = "/Users/christine/Desktop/flights/2017/jun2017.csv"
# jul2017 = "/Users/christine/Desktop/flights/2017/jul2017.csv"
# aug2017 = "/Users/christine/Desktop/flights/2017/aug2017.csv"
# sep2017 = "/Users/christine/Desktop/flights/2017/sep2017.csv"

jan2016 = "/Users/christine/Desktop/flights/2016/jan2016.csv"
feb2016 = "/Users/christine/Desktop/flights/2016/feb2016.csv"
mar2016 = "/Users/christine/Desktop/flights/2016/mar2016.csv"
apr2016 = "/Users/christine/Desktop/flights/2016/apr2016.csv"
may2016 = "/Users/christine/Desktop/flights/2016/may2016.csv"
jun2016 = "/Users/christine/Desktop/flights/2016/jun2016.csv"
jul2016 = "/Users/christine/Desktop/flights/2016/jul2016.csv"
aug2016 = "/Users/christine/Desktop/flights/2016/aug2016.csv"
sep2016 = "/Users/christine/Desktop/flights/2016/sep2016.csv"
oct2016 = "/Users/christine/Desktop/flights/2016/oct2016.csv"
nov2016 = "/Users/christine/Desktop/flights/2016/nov2016.csv"
dec2016 = "/Users/christine/Desktop/flights/2016/dec2016.csv"

jan2015 = "/Users/christine/Desktop/flights/2015/jan2015.csv"
feb2015 = "/Users/christine/Desktop/flights/2015/feb2015.csv"
mar2015 = "/Users/christine/Desktop/flights/2015/mar2015.csv"
apr2015 = "/Users/christine/Desktop/flights/2015/apr2015.csv"
may2015 = "/Users/christine/Desktop/flights/2015/may2015.csv"
jun2015 = "/Users/christine/Desktop/flights/2015/jun2015.csv"
jul2015 = "/Users/christine/Desktop/flights/2015/jul2015.csv"
aug2015 = "/Users/christine/Desktop/flights/2015/aug2015.csv"
sep2015 = "/Users/christine/Desktop/flights/2015/sep2015.csv"
oct2015 = "/Users/christine/Desktop/flights/2015/oct2015.csv"
nov2015 = "/Users/christine/Desktop/flights/2015/nov2015.csv"
dec2015 = "/Users/christine/Desktop/flights/2015/dec2015.csv"

# jan2014 = "/Users/christine/Desktop/flights/2014/jan2014.csv"
# feb2014 = "/Users/christine/Desktop/flights/2014/feb2014.csv"
# mar2014 = "/Users/christine/Desktop/flights/2014/mar2014.csv"
# apr2014 = "/Users/christine/Desktop/flights/2014/apr2014.csv"
# may2014 = "/Users/christine/Desktop/flights/2014/may2014.csv"
# jun2014 = "/Users/christine/Desktop/flights/2014/jun2014.csv"
# jul2014 = "/Users/christine/Desktop/flights/2014/jul2014.csv"
# aug2014 = "/Users/christine/Desktop/flights/2014/aug2014.csv"
# sep2014 = "/Users/christine/Desktop/flights/2014/sep2014.csv"
# oct2014 = "/Users/christine/Desktop/flights/2014/oct2014.csv"
# nov2014 = "/Users/christine/Desktop/flights/2014/nov2014.csv"
# dec2014 = "/Users/christine/Desktop/flights/2014/dec2014.csv"
 


# jan2013 = "/Users/christine/Desktop/flights/2013/jan2013.csv"
# feb2013 = "/Users/christine/Desktop/flights/2013/feb2013.csv"
# mar2013 = "/Users/christine/Desktop/flights/2013/mar2013.csv"
# apr2013 = "/Users/christine/Desktop/flights/2013/apr2013.csv"
# may2013 = "/Users/christine/Desktop/flights/2013/may2013.csv"
# jun2013 = "/Users/christine/Desktop/flights/2013/jun2013.csv"
# jul2013 = "/Users/christine/Desktop/flights/2013/jul2013.csv"
# aug2013 = "/Users/christine/Desktop/flights/2013/aug2013.csv"
# sep2013 = "/Users/christine/Desktop/flights/2013/sep2013.csv"
# oct2013 = "/Users/christine/Desktop/flights/2013/oct2013.csv"
# nov2013 = "/Users/christine/Desktop/flights/2013/nov2013.csv"
# dec2013 = "/Users/christine/Desktop/flights/2013/dec2013.csv"

a = pd.read_csv(jan2016, low_memory=False) 
b = pd.read_csv(feb2016, low_memory=False)
b = b.reset_index(drop=True) 

c = pd.read_csv(mar2016, low_memory=False) 
c = c.reset_index(drop=True) 

d = pd.read_csv(apr2016, low_memory=False) 
d = d.reset_index(drop=True) 

e = pd.read_csv(may2016, low_memory=False) 
e = e.reset_index(drop=True) 

f = pd.read_csv(jun2016, low_memory=False)
f = f.reset_index(drop=True) 
 
g = pd.read_csv(jul2016, low_memory=False) 
g = g.reset_index(drop=True) 

h = pd.read_csv(aug2016, low_memory=False) 
h = h.reset_index(drop=True) 

i = pd.read_csv(sep2016, low_memory=False) 
i = i.reset_index(drop=True) 

j = pd.read_csv(oct2016, low_memory=False)
j = j.reset_index(drop=True) 

k = pd.read_csv(nov2016, low_memory=False) 
k = k.reset_index(drop=True) 

l = pd.read_csv(dec2016, low_memory=False) 
l = l.reset_index(drop=True) 

# m = pd.read_csv(apr2016, low_memory=False) 
# m = m.reset_index(drop=True) 

# n = pd.read_csv(may2016, low_memory=False)
# n = n.reset_index(drop=True) 
 
# o = pd.read_csv(jun2016, low_memory=False) 
# o = o.reset_index(drop=True) 

# p = pd.read_csv(jul2016, low_memory=False) 
# p = p.reset_index(drop=True) 

# q = pd.read_csv(aug2016, low_memory=False) 
# q = q.reset_index(drop=True) 

# r = pd.read_csv(sep2016, low_memory=False)
# r = r.reset_index(drop=True) 

# s = pd.read_csv(oct2016, low_memory=False) 
# s = s.reset_index(drop=True) 

# t = pd.read_csv(nov2016, low_memory=False) 
# t = t.reset_index(drop=True) 

# u = pd.read_csv(dec2016, low_memory=False) 
# u = u.reset_index(drop=True) 

v = pd.read_csv(jan2015, low_memory=False)
v = v.reset_index(drop=True) 
 
w = pd.read_csv(feb2015, low_memory=False) 
w = w.reset_index(drop=True) 

x = pd.read_csv(mar2015, low_memory=False) 
x = x.reset_index(drop=True) 

y = pd.read_csv(apr2015, low_memory=False) 
y = y.reset_index(drop=True) 

z = pd.read_csv(may2015, low_memory=False)
z = z.reset_index(drop=True) 

aa = pd.read_csv(jun2015, low_memory=False) 
aa = aa.reset_index(drop=True) 

bb = pd.read_csv(jul2015, low_memory=False) 
bb = bb.reset_index(drop=True) 

cc = pd.read_csv(aug2015, low_memory=False) 
cc = cc.reset_index(drop=True) 

dd = pd.read_csv(sep2015, low_memory=False)
dd = dd.reset_index(drop=True) 
 
ee = pd.read_csv(oct2015, low_memory=False) 
ee = ee.reset_index(drop=True) 

ff = pd.read_csv(nov2015, low_memory=False) 
ff = ff.reset_index(drop=True) 

gg = pd.read_csv(dec2015, low_memory=False) 
gg = gg.reset_index(drop=True) 

# hh = pd.read_csv(jan2014, low_memory=False)
# hh = hh.reset_index(drop=True) 

# ii = pd.read_csv(feb2014, low_memory=False) 
# ii = ii.reset_index(drop=True) 

# jj = pd.read_csv(mar2014, low_memory=False) 
# jj = jj.reset_index(drop=True) 

# kk = pd.read_csv(apr2014, low_memory=False) 
# kk = kk.reset_index(drop=True) 

# ll = pd.read_csv(may2014, low_memory=False)
# ll = ll.reset_index(drop=True) 
 
# mm = pd.read_csv(jun2014, low_memory=False) 
# mm = mm.reset_index(drop=True) 

# nn = pd.read_csv(jul2014, low_memory=False) 
# nn = nn.reset_index(drop=True) 

# oo = pd.read_csv(aug2014, low_memory=False) 
# oo = oo.reset_index(drop=True) 

# pp = pd.read_csv(sep2014, low_memory=False)
# pp = pp.reset_index(drop=True) 

# qq = pd.read_csv(oct2014, low_memory=False) 
# qq = qq.reset_index(drop=True) 

# rr = pd.read_csv(nov2014, low_memory=False) 
# rr = rr.reset_index(drop=True) 

# ss = pd.read_csv(dec2014, low_memory=False) 
# ss = ss.reset_index(drop=True) 

# tt = pd.read_csv(jan2013, low_memory=False)
# tt = tt.reset_index(drop=True) 
 
# uu = pd.read_csv(feb2013, low_memory=False) 
# uu = uu.reset_index(drop=True) 

# vv = pd.read_csv(mar2013, low_memory=False) 
# vv = vv.reset_index(drop=True) 

# ww = pd.read_csv(apr2013, low_memory=False) 
# ww = ww.reset_index(drop=True)

# xx = pd.read_csv(may2013, low_memory=False)
# xx = xx.reset_index(drop=True) 

# yy = pd.read_csv(jun2013, low_memory=False) 
# yy = yy.reset_index(drop=True) 

# zz = pd.read_csv(jul2013, low_memory=False) 
# zz = zz.reset_index(drop=True) 

# aaa = pd.read_csv(aug2013, low_memory=False) 
# aaa = aaa.reset_index(drop=True) 

# bbb = pd.read_csv(sep2013, low_memory=False)
# bbb = bbb.reset_index(drop=True) 
 
# ccc = pd.read_csv(oct2013, low_memory=False) 
# ccc = ccc.reset_index(drop=True) 

# ddd = pd.read_csv(nov2013, low_memory=False) 
# ddd = ddd.reset_index(drop=True) 

# eee = pd.read_csv(dec2013, low_memory=False) 
# eee = eee.reset_index(drop=True) 


twenty17 = pd.concat([a, b, c, d, e, f, g, h, i, j, k, l,v, w, x, y, z, aa, bb, cc, dd, ee, ff, gg], axis=0, ignore_index=True)
# twenty17 = pd.concat([a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, aa, bb, cc, dd, ee, ff, gg, hh, ii, jj, kk, ll, mm, nn, oo, pp, qq, rr, ss, tt, uu, vv, ww, xx, yy, zz, aaa, bbb, ccc, ddd, eee], axis=0, ignore_index=True)


finalcolumn = twenty17['ARR_DELAY_NEW']
finalcolumn= finalcolumn.fillna(0).astype(int)

idx = 0
for val in np.nditer(finalcolumn):
	if val <= 15 and val>0:
		finalcolumn[idx] = 15
	if val<=30 and val>15:
		finalcolumn[idx] = 30
	if val<=45 and val>30:
		finalcolumn[idx] = 45
	if val>45:
		finalcolumn[idx] = 46
	idx = idx+1


#LR: 0.664645 (0.000786)

#LDA: 0.664645 (0.000786)


keep_col = ['MONTH', 'AIRLINE_ID', 'ORIGIN_AIRPORT_ID', 'DEST_AIRPORT_ID', 'DISTANCE']
fixedcolumns = twenty17[keep_col]
flightdata = pd.concat([fixedcolumns, finalcolumn], axis=1)
flightdata['DISTANCE'] = flightdata['DISTANCE'].astype(int)
flightdata['ARR_DELAY_NEW'] = flightdata['ARR_DELAY_NEW'].astype(int)

array = flightdata.values     
X = array[:,0:5]
Y = array[:,5] 
validation_size = 0.20
seed = 7
X_train, X_validation, Y_train, Y_validation = model_selection.train_test_split(X, Y, test_size=validation_size, random_state=seed)

models = []
models.append(('LR', LogisticRegression()))
models.append(('LDA', LinearDiscriminantAnalysis()))
models.append(('KNN', KNeighborsClassifier()))
models.append(('CART', DecisionTreeClassifier()))
models.append(('NB', GaussianNB()))

results = []
names = ['MONTH', 'AIRLINE_ID', 'ORIGIN_AIRPORT_ID', 'DEST_AIRPORT_ID', 'DISTANCE', 'ARR_DELAY_NEW']
seed = 7
scoring = 'accuracy'

for name, model in models:
    kfold = model_selection.KFold(n_splits=10, random_state=seed)
	cv_results = model_selection.cross_val_score(model, X_train, Y_train, cv=kfold, scoring=scoring)
	results.append(cv_results)
	names.append(name)
	msg = "%s: %f (%f)" % (name, cv_results.mean(), cv_results.std())
	print(msg)

lr = LogisticRegression() 
lr.fit(X_train, Y_train) 
predictions = lr.predict(X_validation)

cart = DecisionTreeClassifier()
cart.fit(X_train, Y_train)
predictions = cart.predict(X_validation)
print(accuracy_score(Y_validation, predictions))
print(confusion_matrix(Y_validation, predictions))
print(classification_report(Y_validation, predictions))
