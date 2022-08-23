import Link from 'next/link'
import { Fragment } from 'react'

export default function Disclaimer() {
  return (
    <Fragment>
      <div className="flex self-start ml-12 text-white text-lg mt-10 p-2 bg-violet-300 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg duration-150 hover:bg-violet-400">
        <Link href="/">{`< Return`}</Link>
      </div>
      <div className="flex flex-col items-center text-white w-3/4 pt-10 pb-10">
        <h1 className="text-5xl text-white mb-6">Disclaimer</h1>
        <p>You must be of legal drinking age to access this Site.</p>
        <p>By entering this Site, you agree to our Terms of Use and Privacy Policy.</p>
        <p>The Company does not recomend alcohol to persons under the age of 21.</p>
        <p>By accessing this Site, you acknowledge that there is a government warning concerning the health effects of consuming alcoholic beverages:
            Government warning: (1) According to the Surgeon General, women should not drink alcoholic beverages during pregnancy because of the risk of birth defects. (2) Consumption of alcoholic beverages impairs your ability to drive a car or operate machinery, and may cause health problems. Drink responsibly.</p>
        <p>In consideration for your being given access to the Site, you hereby release, waive, discharge and covenant not to sue the Company, subsidiaries, DBAs, affiliates, successors, contractors, agents, representatives and/or employees from any and all liability, claims, demands, actions and causes of action whatsoever arising out of or relating to any damage to your property or loss, damage or injury that you personally sustain, including death, whether caused by the negligence of the Company or its representatives or not while participating in Company programs, using Site content and/or attending Company Events in person, regardless of location. You hereby assume all risks to your property and your person and in no way will the Company be liable to you for damages or injuries you sustain.</p>
      </div>
    </Fragment>
  )
}