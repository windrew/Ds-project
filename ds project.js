const scriptName = "ds project";
var kname=DataBase.getDataBase("krteacher.txt").split("\n");
var khash=[];
var enhash=[];
var tenhash=[];
var people=[];
var keyboard=[];
var enname=DataBase.getDataBase("enteacher.txt").split("\n");
var hashval=DataBase.getDataBase("hashvalue.txt").split("\n");
var enhashval=DataBase.getDataBase("enhashvalue.txt").split(",");
var tagsearch=DataBase.getDataBase("teachertag.txt").split("\n");
var intro=DataBase.getDataBase("intro.txt");
var introself=DataBase.getDataBase("introself.txt");
var tenteacher=DataBase.getDataBase("tenteacher.txt").split("\n");
var tenhashval=DataBase.getDataBase("tenhashval.txt").split(",");
var len = kname.length;
var enlen = enname.length;
var taglen = tagsearch.length;
var tenlen = tenteacher.length-3;
var enf = 0;
const cat=["화학생물학부","인문예술학부","수리정보과학부","물리지구과학부"];

for(var i=0;i<len;i++)
{
  khash.push(Number(kname[i].split(';')[0]));
}

for(i=0;i<enlen;i++)
{
  enhash.push(Number(enname[i].split(';')[0]));
}

for(i=0;i<tenlen;i++)
{
  tenhash.push(Number(tenteacher[i].split(';')[0]));
}

const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
               'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
               'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
               'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
               'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
               'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
               'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
               'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];


function getConstantVowel(kor) {
    const ga = 44032;
    let uni = kor.charCodeAt(0);

    uni = uni - ga;

    let fn = parseInt(uni / 588);
    let sn = parseInt((uni - (fn * 588)) / 28);
    let tn = parseInt(uni % 28);
    if(f[fn]==undefined||s[sn]==undefined||t[tn]==undefined)return undefined;
    return f[fn]+s[sn]+t[tn];
}

function fncheck(char) {
    var i=0;
    for(i=0;i<19;i++)
    {
      if(char==f[i])
      {
        return true;
      }
    }
    for(i=0;i<21;i++)
    {
      if(char==s[i])
      {
        return true;
      }
    }
    for(i=0;i<26;i++)
    {
      if(char==t[i])
      {
        return true;
      }
    }
    return false;
}

function max(a,b)
{
  if(a>b)return a;
  return b;
}

function min(a,b)
{
  if(a>b)return b;
  return a;
}

function abs(a)
{
  if(a<0)return -a;
  return a;
}

function upperhash(l,r,v)
{
  if(l==r)return r;
  mid=(l+r)>>1;
  if(khash[mid]>=v)return upperhash(l,mid,v);
  else return upperhash(mid+1,r,v);
}

function tenupper(l,r,v)
{
  if(l==r)return r;
  mid=(l+r)>>1;
  if(tenhash[mid]>=v)return tenupper(l,mid,v);
  else return tenupper(mid+1,r,v);
}

function enupperhash(l,r,v)
{
  if(l==r)return r;
  mid=(l+r)>>1;
  if(enhash[mid]>=v)return enupperhash(l,mid,v);
  else return enupperhash(mid+1,r,v);
}

function envaluefind(hash)
{
  var i=0,j=0,left=[],right=[],merg=[];
  var idx = enupperhash(0,enlen-1,hash);
  for(i=idx-1;i>=max(idx-5,0);i--)
  {
    left.push(i);
  }
  for(i=idx;i<min(idx+5,enlen);i++)
  {
    right.push(i);
  }
  left.push(enlen-1);
  right.push(0);
  var l=0, r=0;
  for(i=0;i<5;i++)
  {
    if(abs(hash-enhash[left[l]])<abs(hash-enhash[right[r]])||right[r]==0)
    {
      merg.push(enname[left[l]]);
      l++;
    }
    else
    {
      merg.push(enname[right[r]]);
      r++;
    }
  }
  return merg;
}


function valuefind(hash)
{
  var i=0,j=0,left=[],right=[],merg=[];
  var idx = upperhash(0,len-1,hash);
  for(i=idx-1;i>=max(idx-5,0);i--)
  {
    left.push(i);
  }
  for(i=idx;i<min(idx+5,len);i++)
  {
    right.push(i);
  }
  left.push(len-1);
  right.push(0);
  var l=0, r=0;
  for(i=0;i<5;i++)
  {
    if(abs(hash-khash[left[l]])<abs(hash-khash[right[r]])||right[r]==0)
    {
      merg.push(kname[left[l]]);
      l++;
    }
    else
    {
      merg.push(kname[right[r]]);
      r++;
    }
  }
  return merg;
}

function tenfind(hash)
{
  var i=0,j=0,left=[],right=[],merg=[];
  var idx = tenupper(0,tenlen-1,hash);
  for(i=idx-1;i>=max(idx-5,0);i--)
  {
    left.push(i);
  }
  for(i=idx;i<min(idx+5,tenlen);i++)
  {
    right.push(i);
  }
  left.push(tenlen-1);
  right.push(0);
  var l=0, r=0;
  for(i=0;i<5;i++)
  {
    if(abs(hash-tenhash[left[l]])<abs(hash-tenhash[right[r]])||right[r]==0)
    {
      merg.push(tenteacher[left[l]]);
      l++;
    }
    else
    {
      merg.push(tenteacher[right[r]]);
      r++;
    }
  }
  return merg;
}


function encalcvalue(lst)
{
  var lenst = lst.length, lenha = enhashval.length;
  var i=0,ans=1;
  for(i=0;i<lenst;i++)
  {
    for(j=0;j<lenha;j++)
    {
      if(lst[i]==enhashval[j][0])
      {
        ans*=Number(enhashval[j][2]+enhashval[j][3]);
        break;
      }
    }
  }
  for(i=lenst;i<8;i++)
  {
    ans*=30;
  }
  return ans;
}

function calcvalue(lst)
{
  var lenst = lst.length, lenha = hashval.length;
  var i=0,ans=1;
  for(i=0;i<lenst;i++)
  {
    for(j=0;j<lenha;j++)
    {
      if(lst[i]==hashval[j][0])
      {
        ans*=Number(hashval[j][1]+hashval[j][2]);
        break;
      }
    }
  }
  for(i=lenst;i<12;i++)
  {
    ans*=30;
  }
  return ans;
}

function tenvalue(lst)
{
  var lenst = lst.length, lenha = tenhashval.length;
  var i=0,ans=1,numb="";
  for(i=0;i<lenst;i++)
  {
    for(j=0;j<lenha;j++)
    {
      var f=2;
      if(j==0)f=1;
      if(lst[i]==tenhashval[j][f])
      {
        var k=5;
        if(j==0)k--;
        for(;k<tenhashval[j].length;k++)
        {
          numb = numb + tenhashval[j][k];
        }
        ans*=Number(numb);
        break;
      }
    }
    numb="";
  }
  for(i=lenst;i<12;i++)
  {
    ans*=30;
  }
  return ans;
}

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    var lenmsg = msg.length;
    var i=0;
    var r = "";
    var st="";
    var a=0;
    var p=0;
    var info=0;
    var line="";
    for(i=0;i<people.length;i++)
    {
      if(people[i]==sender)break;
    }
    if(msg=="//등록" && i==people.length)
    {
      people.push(sender);
      keyboard.push(1);
      replier.reply(intro);
      return;
    }
    if(i==people.length)
    {
      return;
    }
    var idx = i;
    if(msg=="/천지인")
    {
      keyboard[i]=2;
      replier.reply("현재 키입력 모드는 천지인입니다!");
      return;
    }
    if(msg=="/두벌식")
    {
      keyboard[i]=1;
      replier.reply("현재 키입력 모드는 두벌식입니다!");
      return;
    }
    if(msg=="/도움말")
    {
      replier.reply(intro);
      return;
    }
    if(msg=="/소개글")
    {
      replier.reply(introself);
      return;
    }
    if(msg=="/만든사람")
    {
      replier.reply("Teacher_infbot by 박예성 & 전제유");
      return;
    }
    if(msg[0]=="#")
    {
      var newmsg=msg.split("#")[1];
      var findlst=[];
      for(i=0;i<taglen;i++)
      {
        var tags=tagsearch[i].split(";")[1].split(",");
        tags[2]=tags[2].split(tags[2][tags[2].length-1])[0];
        for(var j=0;j<3;j++)
        {
          if(tags[j]==newmsg)
          {
            findlst.push(tagsearch[i].split(";")[0]);
            break;
          }
        }
      }
      var ans = "찾은 선생님(들)은";
      var lne = "\n----------------------------------------------------";
      for(i=0;i<findlst.length;i++)
      {
        for(j=0;j<len;j++)
        {
          if(findlst[i]==kname[j].split(';')[2])
          {
            break;
          }
        }
        var ifo = 0;
        if(j==len)
        {
          for(j=0;j<enlen;j++)
          {
            if(findlst[i]==enname[j].split(';')[2])
            {
              break;
            }
          }
          if(j==enlen)
          {
            ans = ans + lne + "\n행정부 : " + findlst[i];
            continue;
          }
          ifo = enname[j].split(';');
        }
        else ifo = kname[j].split(';');
        for(j=0;j<taglen;j++)
        {
          if(tagsearch[j].split(';')[0]==ifo[2])
          {
            enf=tagsearch[j].split(';')[1].split(',');
            break;
          }
        }
        st = "";
        st = "성함 : "+ifo[2]+"\n학부 : "+cat[ifo[3]]+"\n오피스 위치 : "+ifo[4]+"\n오피스 아워 : "+ifo[5]+"\n전화번호 : "+ifo[6]+"\n태그 : "+enf;
        ans = ans + lne + "\n";
        ans = ans + st;
      }
      ans = ans + lne + "\n입니다!";
      replier.reply(ans);
      return;
    }
    for(i=0;i<lenmsg;i++)
    {
      if(msg[i]==" ")continue;
      if(msg[i]>'z'||msg[i]<'a')break;
      r = r + msg[i];
    }
    if(lenmsg==i)
    {
      hashv = encalcvalue(r);
      var ep = envaluefind(hashv);
      var enfo = ep[0].split(";");
      var eline = "\n------------------------------------------------------";
      for(i=0;i<taglen;i++)
      {
        if(tagsearch[i].split(';')[0]==enfo[2])
        {
          enf=tagsearch[i].split(';')[1].split(',');
          break;
        }
      }
      st = "성함 : "+enfo[2]+"\n학부 : "+cat[enfo[3]]+"\n오피스 위치 : "+enfo[4]+"\n오피스 아워 : "+enfo[5]+"\n전화번호 : "+enfo[6]+"\n태그 : "+enf;
      st = st + eline;
      for(i=1;i<5;i++)
      {
        enfo = ep[i].split(";");
        for(j=0;j<taglen;j++)
        {
          if(tagsearch[j].split(';')[0]==enfo[2])
          {
            enf=tagsearch[j].split(';')[1].split(',');
            break;
          }
        }
        st = st + "\n성함 : "+enfo[2]+"\n학부 : "+cat[enfo[3]]+"\n오피스 위치 : "+enfo[4]+"\n오피스 아워 : "+enfo[5]+"\n전화번호 : "+enfo[6]+"\n태그 : "+enf;
        st = st + eline;
      }
      replier.reply(st);
      return;
    }
    if(keyboard[idx]==1)
    {
      for(i=0;i<lenmsg;i++)
      {
        if(msg[i]==" ")continue;
        if(fncheck(msg[i]))
        {
          r = r + msg[i];
          continue;
        }
        a = getConstantVowel(msg[i]);
        if(a==undefined)break;
        r = r + a;
      }
      if(lenmsg==i)
      {
        hashv = calcvalue(r);
        p = valuefind(hashv);
        info = p[0].split(";");
        for(j=0;j<taglen;j++)
        {
          if(tagsearch[j].split(';')[0]==info[2])
          {
            enf=tagsearch[j].split(';')[1].split(',');
            break;
          }
        }
        line = "\n------------------------------------------------------";
        st = "성함 : "+info[2]+"\n학부 : "+cat[info[3]]+"\n오피스 위치 : "+info[4]+"\n오피스 아워 : "+info[5]+"\n전화번호 : "+info[6]+"\n태그 : "+enf;
        st = st + line;
        for(i=1;i<5;i++)
        {
          info = p[i].split(";");
          for(j=0;j<taglen;j++)
          {
            if(tagsearch[j].split(';')[0]==info[2])
            {
              enf=tagsearch[j].split(';')[1].split(',');
              break;
            }
          }
          st = st + "\n성함 : "+info[2]+"\n학부 : "+cat[info[3]]+"\n오피스 위치 : "+info[4]+"\n오피스 아워 : "+info[5]+"\n전화번호 : "+info[6]+"\n태그 : "+enf;
          st = st + line;
        }
        replier.reply(st);
      }
      else replier.reply("이름에 기호를 넣지 말아주세요!");
    }
    else
    {
      for(i=0;i<lenmsg;i++)
      {
        if(msg[i]==" ")continue;
        if(fncheck(msg[i])||msg[i]=='ㆍ'||msg[i]=='ᆢ')
        {
          r = r + msg[i];
          continue;
        }
        a = getConstantVowel(msg[i]);
        if(a==undefined)break;
        r = r + a;
      }
      if(lenmsg==i)
      {
        hashv = tenvalue(r);
        p = tenfind(hashv);
        replier.reply(hashv);
        info = p[0].split(";");
        for(j=0;j<taglen;j++)
        {
          if(tagsearch[j].split(';')[0]==info[1])
          {
            enf=tagsearch[j].split(';')[1].split(',');
            break;
          }
        }
        line = "\n------------------------------------------------------";
        st = "성함 : "+info[1]+"\n학부 : "+cat[info[3]]+"\n오피스 위치 : "+info[4]+"\n오피스 아워 : "+info[5]+"\n전화번호 : "+info[6]+"\n태그 : "+enf;
        st = st + line;
        for(i=1;i<5;i++)
        {
          info = p[i].split(";");
          for(j=0;j<taglen;j++)
          {
            if(tagsearch[j].split(';')[0]==info[1])
            {
              enf=tagsearch[j].split(';')[1].split(',');
              break;
            }
          }
          st = st + "\n성함 : "+info[1]+"\n학부 : "+cat[info[3]]+"\n오피스 위치 : "+info[4]+"\n오피스 아워 : "+info[5]+"\n전화번호 : "+info[6]+"\n태그 : "+enf;
          st = st + line;
        }
        replier.reply(st);
      }
      else replier.reply("이름에 기호를 넣지 말아주세요!");
    }
}