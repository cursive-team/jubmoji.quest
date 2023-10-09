import { NextResponse } from "next/server";
import { GoogleAuth } from "google-auth-library";
import { NextApiRequest, NextApiResponse } from "next";

const CREDENTIALS = {
  type: "service_account",
  project_id: "self-1590553424634",
  private_key_id: "594f80a47fa4286fd772f58c5f7bd5ec21d48d51",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCiaTp66TwI472V\nhZpX+RQFw+OmzuqU3t/Vt5Gk9FQ/3tpwFr1HKB6iCYAxCv/CyGRueuEYiGF/6cPY\ndgVE4OrdRgG8A8kaL2SOSGqmDL2WkKZoVpxxNomutWFwGNkCFys6ZFAac01znSKC\nj0qq7rReyHKva9EGXK9Zmx0vNDytpnVVjNZgUHbEHyD9noQM+OuZW6SoLxb2Rii/\nHczjsud8q9524OGC0eKipaHis9temZdcQEY+15d4h8Ct6S/tEwdUipNPBIobNX00\nLXAoLGabg5k5hShs2bXA1taPYQR5Wxc6vmn/W+KjzHpJhAmfk0il186ZCpg1//YP\n4CyHendVAgMBAAECggEADaDt7t1+k7JkuNTeyE4W/4raIifP6JExUFJYrvJv1XJC\ne1B1LrDvrSJF9xeYscQ2JU07cV8Ua3L248W3mHmVS98xixD4QbHDauspw+hiym02\nAaBu/VMZx6bh19HF+BZworRDQoz1bWO8vx7+IYzpZuDEOvM9tZ52enr5PnpQMzQY\nAKLygZFbLFYPS9+pU7sEPpy8+QMT+Djwsf46Ufd4mQket+wqMS2jN+zTA8pCOm3Y\nY0e7oRJZeR7XSV4NLNGAaoADUPxafuDpD9wAHs/+SMEsrBPX2OzA7a6gpm2R1qVC\n769h5UDfeXZ4Ox4eAmSybRX0bQJP75e3K9QRBjFJ8QKBgQDNF8FOGJ6qaHZpGVR4\nWLFwa9cEgfbQusau82s23Fb/GQ+IQFroh5hFTyNz6qLX7n1UN4z89aBI8HupPsW5\nITNrc9dVcc+DvO5nabExCTg/119EVmb65GAnXC8Abwx0BMpVUyIsp2h/62Lgz1xX\nt3iJXHM0hW98Be8vuWrrcEZe/QKBgQDKuVca3UPcJxf3RbJIzkLfuBjn2PHqVFAp\nbkalYY8KIycLAo5Yn/7fqBZZmqDlzOFooh9y3SzasaXlYi6WYutCORP6/trKB3GQ\ngbO2IkbXqq5gysuCVYt2HtoMTrrqJYT5/+T4QeuT9E0gGESkl8vybn+ljYIpe2wj\ntt/oDWPlOQKBgCezJ3oEjgISgolJm+5HzOEkHtUCi1JQNVF8UQ6njDeJFFadjntg\nc/tGnGg9zRPbWGtK7YGx0jsMQgO64O87HAb6v34Mr8yib8uYy/HgBQFmoUxLJVf/\niRVVZMvCszhqDPiDRSQ7q6DHYbZ+rTNVkoGUYcCS68eoJmqoi6fTbevJAoGACL9u\nrs4Ve46ETjtHsjSUVisPiBGofsAcpW0Ix2IqVfmmWadGlTRyPxx1unAduUzZ/TXh\nvYclxFoeGoPeFsc196mW3yHYNxeTIvU12AoqnGvVEoAtv/YJCpPSPO24yxnLXy5X\npw7RJ5VHLrddXuzd9BwojfBJSZj11aSyjMTnJqECgYB06E9uHgvFefq4P50E5xxl\nMQELrsfDGP4L4UkUQvQ8UAsBXNnEFaiuFarQR+wbYv/JoU3/6S/n/C5RtFdZb6b/\nGmwUtIa/vZ5ojrdRsup2enF8Z91Q0b8d9PobeIRYn9pbBOC7NJ5JNlQRVBtEWQwR\nOGUNQQVf5JXVDQuti4DAuA==\n-----END PRIVATE KEY-----\n",
  client_email: "project-vinyl@self-1590553424634.iam.gserviceaccount.com",
  client_id: "103146753565011709218",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/project-vinyl%40self-1590553424634.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (request.method !== "GET") return res.status(404).json({ success: false });

  const { number, serial, collection } = request.query ?? ({} as any);

  // Check for required params
  if (!number || !serial || !collection) {
    console.error(
      `[/api/updateGooglePass] missing 'number' or 'serial' or 'collection' field`
    );
    return res.status(400).json({
      success: false,
      message: `[/api/updateGooglePass] missing 'number' or 'serial' or 'collection' field`,
    });
  }

  if (parseInt(number as string) > 40) {
    console.error("[/api/updateGooglePass] number > 40");
    return res.status(400).json({
      success: false,
      message: `[/api/updateGooglePass] number > 40`,
    });
  }

  const httpClient = new GoogleAuth({
    credentials: CREDENTIALS,
    scopes: "https://www.googleapis.com/auth/wallet_object.issuer",
  });

  const updatedObject = {
    textModulesData: [
      {
        id: "score",
        header: "SCORE",
        body: "?",
      },
      {
        id: "collected",
        header: "COLLECTED",
        body: `${number}/40`,
      },
      {
        id: "location",
        header: "LOCATION",
        body: "Berlin",
      },
      {
        id: "event",
        header: "EVENT",
        body: "FtC",
      },
      {
        id: "year",
        header: "YEAR",
        body: "2023",
      },
    ],
    linksModuleData: {
      uris: [
        {
          uri: `http://nfctap.xyz/recover?collection=${collection}`,
          description: "Retrieve your collection",
          id: "official_site",
        },
      ],
    },
  };

  await httpClient.request({
    url: `https://walletobjects.googleapis.com/walletobjects/v1/genericObject/${serial}`,
    method: "PATCH",
    data: updatedObject,
  });

  return res.status(200).json({ success: true });
}
