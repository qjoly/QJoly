const thisYear = new Date().getFullYear()
const startTimeOfThisYear = new Date(`${thisYear}-01-01T00:00:00+00:00`).getTime()
const endTimeOfThisYear = new Date(`${thisYear}-12-31T23:59:59+00:00`).getTime()
const progressOfThisYear = (Date.now() - startTimeOfThisYear) / (endTimeOfThisYear - startTimeOfThisYear)
const progressBarOfThisYear = generateProgressBar()

function generateProgressBar() {
    const progressBarCapacity = 30
    const passedProgressBarIndex = parseInt(progressOfThisYear * progressBarCapacity)
    const progressBar =
      '█'.repeat(passedProgressBarIndex) +
      '▁'.repeat(progressBarCapacity - passedProgressBarIndex)
    return `{ ${progressBar} }`
}

const readme = `\
<h2 align="center">👋 Hello!</h2>
<p align="center">
  <a href="https://thebidouilleur.xyz">Blog</a> •
  <a href="https://twitter.com/thebidouilleur">Twitter</a>
</p>


- 🔭 I’m currently working at [French government](https://www.gouvernement.fr/).
- 🌱 I’m currently learning more on Nix and better [X-as-code](https://quadralogics.com/research/XAsCode.html) practices.
- 💬 Ask me about **Containers, Kubernetes and Python**
- 📫 How to reach me: [@TheBidouilleur](https://twitter.com/TheBidouilleur) on Twitter

![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white) ![Terraform](https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white) ![Packer](https://img.shields.io/badge/packer-%23E7EEF0.svg?style=for-the-badge&logo=packer&logoColor=%2302A8EF) ![Ansible](https://img.shields.io/badge/ansible-%231A1918.svg?style=for-the-badge&logo=ansible&logoColor=white) ![NixOS](https://img.shields.io/badge/NixOS-48B9C7?style=for-the-badge&logo=NixOS&logoColor=white)

 -------

**📝 Latest Blog Posts**

<!-- BLOG-POST-LIST:START -->
- [Remarkable, une avancée dans les prises de notes](https://thebidouilleur.xyz/blog/remarkable)
- [NixOS, Ma nouvelle distribution](https://thebidouilleur.xyz/blog/nixos)
- [Mes débuts à la gyroroue](https://thebidouilleur.xyz/blog/gyroroue)
- [Longhorn, stockage distribué](https://thebidouilleur.xyz/blog/longhorn)
- [Mes débuts avec s3](https://thebidouilleur.xyz/blog/s3contabo)
<!-- BLOG-POST-LIST:END -->

-------
### Stats

<br/>
<p align="left">
  <a href="https://thebidouilleur.xyz/">
  <img width="49.5%" src="https://github-readme-stats.vercel.app/api?username=qjoly&show_icons=true&locale=en&bg_color=0D1117&text_color=ffffff&hide_border=true" />
    <img width="49.5%" src="https://github-readme-streak-stats.herokuapp.com/?user=qjoly&theme=dark&background=0D1117&hide_border=true" />
  </a>
</p>
<br>

### Other

![View Counter](https://visitor-badge.glitch.me/badge?page_id=qjoly.qjoly)

⏳ Year progress ${progressBarOfThisYear} ${(progressOfThisYear * 100).toFixed(2)} %

---

⏰ Updated on ${new Date().toUTCString()}
\
`

console.log(readme)

