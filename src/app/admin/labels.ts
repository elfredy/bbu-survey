/** Form sahələrinin admin panelində göstərilən etiketləri */
export const FIELD_LABELS: Record<string, string> = {
  companyName: "Şirkətin adı",
  sector: "Fəaliyyət sahəsi",
  employeeCount: "Əməkdaşların sayı",
  branchCount: "Filial sayı",
  itResponsible: "IT üzrə məsul şəxs",
  itBudget: "IT xərclərə aylıq büdcə",
  pcCount: "Kompüter sayı",
  os: "Əsas əməliyyat sistemi",
  server: "Server mövcuddurmu",
  t1: "Local Network (LAN)",
  t2: "WiFi şəbəkə",
  t3: "VPN",
  t4: "Cloud xidmətləri",
  t5: "Microsoft 365 / Google Workspace",
  itSupport: "IT texniki xidmət kim tərəfindən",
  website: "Rəsmi veb sayt varmı",
  f1: "Online sifariş sistemi",
  f2: "Online ödəniş",
  f3: "Müştəri kabineti",
  f4: "CRM inteqrasiyası",
  f5: "Çoxdilli dəstək",
  f6: "SEO optimallaşdırma",
  mobileApp: "Mobil tətbiq",
  social: "Sosial media inteqrasiyası",
  p1: "Müştəri idarəetməsi",
  p2: "Sifarişlərin idarəsi",
  p3: "Anbar uçotu",
  p4: "Maliyyə uçotu",
  p5: "İşçi idarəetməsi (HR)",
  p6: "Müqavilə idarəetməsi",
  p7: "Hesabat / reporting",
  automationPriority: "Hansı proseslərin avtomatlaşdırılması vacibdir",
  currentTools: "İstifadə olunan proqram / alətlər",
  crmUse: "CRM sistemi",
  crmSystem: "Hansı CRM sistemi",
  crmMissing: "CRM-də çatışmayan",
  erpUse: "ERP sistemi",
  erpScope: "ERP sahələri",
  s1: "Antivirus sistemi",
  s2: "Firewall",
  s3: "Backup sistemi",
  s4: "Access control (giriş nəzarəti)",
  s5: "İki faktorlu autentifikasiya (2FA)",
  s6: "Şifrələmə (encryption)",
  securityIssue: "Son 1 ildə kibertəhlükəsizlik problemi",
  backupLocation: "Backup necə saxlanılır",
  backupFreq: "Backup tezliyi",
  securityTraining: "Kibertəhlükəsizlik təlimi",
  communicationTools: "Daxili kommunikasiya alətləri",
  remoteWork: "Uzaqdan iş imkanı",
  pmTool: "Layihə idarəetmə aləti",
  d1: "Süni intellekt (AI)",
  d2: "Data analitika",
  d3: "IoT",
  d4: "Biznes analitika sistemləri",
  d5: "Chatbot / virtual köməkçi",
  d6: "Elektron imza / sənəd idarəetməsi",
  neededServices: "Hansı IT xidmətlərə ehtiyac var",
  servicePreference: "Xidmət üstünlüyü",
  futureProjects: "Növbəti 2 ildə planlanan layihələr",
  mainPainPoint: "Ən böyük IT problemi / ağrı nöqtəsi",
  implementationTime: "IT həllin tətbiqinə vaxt",
  cooperation: "Xarici IT ilə əməkdaşlığa açıqdırsınızmı",
  cooperationAreas: "Hansı sahələrdə əməkdaşlıq",
  serviceModel: "Xidmət modeli",
  notes: "Qeydlər / əlavə məlumat",
};

const VALUE_LABELS: Record<string, Record<string, string>> = {
  itResponsible: { full: "Bəli, tam ştat", part: "Bəli, part-time / köməkçi", no: "Xeyr" },
  server: { local: "Bəli (lokal)", cloud: "Bəli (cloud)", both: "Hər ikisi", none: "Xeyr" },
  itSupport: { internal: "Daxili IT", external: "Xarici IT şirkəti", none: "Heç biri" },
  website: { yes: "Bəli", "no-plan": "Xeyr (plan var)", "no-noplan": "Xeyr (plan yoxdur)" },
  mobileApp: { both: "Bəli (iOS və Android)", one: "Bəli (biri)", need: "Xeyr, amma lazımdır", no: "Xeyr" },
  crmUse: { yes: "Bəli", need: "Xeyr, amma lazımdır", no: "Xeyr, lazım deyil" },
  erpUse: { yes: "Bəli", need: "Xeyr, amma lazımdır", no: "Xeyr, lazım deyil" },
  securityIssue: { virus: "Bəli (virus/malware)", "data-loss": "Bəli (məlumat itkisi)", unauthorized: "Bəli (icazəsiz giriş)", no: "Xeyr" },
  backupFreq: { daily: "Gündəlik", weekly: "Həftəlik", monthly: "Aylıq", irregular: "Qeyri-müntəzəm", never: "Aparılmır" },
  securityTraining: { regular: "Bəli, müntəzəm", once: "Bəli, birdəfəlik", no: "Xeyr" },
  remoteWork: { full: "Bəli, tam uzaqdan", hybrid: "Bəli, hibrid", office: "Xeyr, ofis" },
  pmTool: { yes: "Bəli (Jira, Trello və s.)", excel: "Xeyr, Excel / sənəd", none: "Xeyr, heç biri" },
  servicePreference: { "off-the-shelf": "Hazır həll", custom: "Xüsusi həll", any: "Fərqi yoxdur" },
  implementationTime: { "1month": "1 ay", "1-3months": "1–3 ay", "3-6months": "3–6 ay", "6plus": "6 ay+" },
  cooperation: { ready: "Bəli, hazırıq", "need-offer": "Bəli, qiymət lazımdır", undecided: "Qərar verməmişik", no: "Xeyr" },
  serviceModel: { project: "Layihə əsaslı", retainer: "Aylıq abunəlik", both: "Hər ikisi" },
  yes: { yes: "Bəli", no: "Xeyr", plan: "Planlı", need: "Lazımdır" },
  auto: { auto: "Avtomatlaşıb", manual: "Əl ilə", none: "Yoxdur" },
  interested: { interested: "Maraqlıdır", not: "Maraqsız", dontknow: "Bilmirəm" },
};

const OS_LABELS: Record<string, string> = { Windows: "Windows", macOS: "macOS", Linux: "Linux" };
const SOCIAL_LABELS: Record<string, string> = { instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn", whatsapp: "WhatsApp Business", none: "Lazım deyil" };
const BACKUP_LABELS: Record<string, string> = { cloud: "Cloud", local: "Lokal server", disk: "Xarici disk", none: "Saxlanılmır" };
const COMM_LABELS: Record<string, string> = { email: "E-poçt", messenger: "WhatsApp/Telegram", "slack-teams": "Slack/Teams", intranet: "Intranet", other: "Digər" };
const ERP_SCOPE: Record<string, string> = { finance: "Maliyyə", sales: "Satış", warehouse: "Anbar", hr: "İnsan resursları", production: "İstehsal", other: "Digər" };
const NEEDED_SERVICES: Record<string, string> = {
  web: "Veb sayt", mobile: "Mobil tətbiq", crm: "CRM", erp: "ERP", automation: "Avtomatlaşdırma",
  security: "IT təhlükəsizlik", cloud: "Cloud", support: "IT dəstək", analytics: "Data analitika", hardware: "IT avadanlıq",
};

export function getFieldLabel(key: string): string {
  return FIELD_LABELS[key] ?? key;
}

export function formatFieldValue(key: string, value: string | string[] | undefined): string {
  if (value == null || value === "") return "—";
  const arr = Array.isArray(value) ? value : [value];
  const single = arr[0];
  if (key === "os") return arr.map((v) => OS_LABELS[v] ?? v).join(", ");
  if (key === "social") return arr.map((v) => SOCIAL_LABELS[v] ?? v).join(", ");
  if (key === "backupLocation") return arr.map((v) => BACKUP_LABELS[v] ?? v).join(", ");
  if (key === "communicationTools") return arr.map((v) => COMM_LABELS[v] ?? v).join(", ");
  if (key === "erpScope") return arr.map((v) => ERP_SCOPE[v] ?? v).join(", ");
  if (key === "neededServices") return arr.map((v) => NEEDED_SERVICES[v] ?? v).join(", ");
  const valueMap = VALUE_LABELS[key] ?? VALUE_LABELS.yes ?? VALUE_LABELS.auto ?? VALUE_LABELS.interested;
  if (valueMap && single in valueMap) return valueMap[single];
  if (["t1", "t2", "t3", "t4", "t5"].includes(key) && single in (VALUE_LABELS.yes ?? {})) return (VALUE_LABELS.yes as Record<string, string>)[single];
  if (["f1", "f2", "f3", "f4", "f5", "f6", "s1", "s2", "s3", "s4", "s5", "s6"].includes(key) && single in (VALUE_LABELS.yes ?? {})) return (VALUE_LABELS.yes as Record<string, string>)[single];
  if (["p1", "p2", "p3", "p4", "p5", "p6", "p7"].includes(key) && single in (VALUE_LABELS.auto ?? {})) return (VALUE_LABELS.auto as Record<string, string>)[single];
  if (["d1", "d2", "d3", "d4", "d5", "d6"].includes(key) && single in (VALUE_LABELS.interested ?? {})) return (VALUE_LABELS.interested as Record<string, string>)[single];
  return Array.isArray(value) ? value.join(", ") : String(value);
}
