WOQL.and(
    WOQL.limit(1).select("v:Active Commit ID").and(
        WOQL.triple("v:My Branch IRI", "@schema:name", "main"),
        WOQL.and(
            WOQL.triple("v:My Branch IRI", "@schema:head", "v:My Head IRI"),
            WOQL.or(
                WOQL.and(
                    WOQL.triple("v:My Head IRI", "@schema:timestamp", "v:My Head TS"),
                    WOQL.and(
                        WOQL.triple("v:My Head IRI", "@schema:identifier", "v:Active Commit ID"),
                        WOQL.not().greater("v:My Head TS", 1626347821.033)
                    )
                ),
                WOQL.and(
                    WOQL.or(
                        WOQL.and(
                            WOQL.path("v:My Head IRI", "@schema:parent+", "v:My Child IRI", "v:Commit Path"),
                            WOQL.triple("v:My Child IRI", "@schema:parent", "v:My Tail IRI")
                        ),
                        WOQL.triple("v:My Child IRI", "@schema:parent", "v:My Tail IRI")
                    ),
                    WOQL.and(
                        WOQL.triple("v:My Child IRI", "@schema:timestamp", "v:My Child Timestamp"),
                        WOQL.and(
                            WOQL.triple("v:My Tail IRI", "@schema:timestamp", "v:My Tail Timestamp"),
                            WOQL.and(
                                WOQL.triple("v:My Tail IRI", "@schema:identifier", "v:Active Commit ID"),
                                WOQL.and(
                                    WOQL.greater("v:My Child Timestamp", 1626347821.033),
                                    WOQL.not().greater("v:My Tail Timestamp", 1626347821.033)
                                )
                            )
                        )
                    )
                )
            )
        )
    ),
    WOQL.order_by("v:Time").or(
        WOQL.and(
            WOQL.limit("201").select("v:Commit ID").and(
                WOQL.triple("v:My Tail IRI", "@schema:identifier", "v:Active Commit ID"),
                WOQL.and(
                    WOQL.triple("v:My Branch IRI", "@schema:name", "main"),
                    WOQL.and(
                        WOQL.triple("v:My Branch IRI", "@schema:head", "v:My Head IRI"),
                        WOQL.and(
                            WOQL.triple("v:My Child IRI", "@schema:identifier", "v:Commit ID"),
                            WOQL.or(
                                WOQL.eq("v:Commit ID", "v:Active Commit ID"),
                                WOQL.and(
                                    WOQL.path("v:My Child IRI", "@schema:parent+", "v:My Tail IRI", "v:Commit Path"),
                                    WOQL.and(
                                        WOQL.or(
                                            WOQL.path("v:My Head IRI", "@schema:parent+", "v:My Child IRI", "v:Branch Path"),
                                            WOQL.eq("v:My Head IRI", "v:My Child IRI")
                                        ),
                                        WOQL.not().eq("v:Commit ID", "v:Active Commit ID")
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            WOQL.using("_commits").order_by("v:Time").and(
                WOQL.triple("v:Commit IRI", "@schema:identifier", "v:Commit ID"),
                WOQL.and(
                    WOQL.triple("v:Commit IRI", "@schema:timestamp", "v:Time"),
                    WOQL.limit(1).and(
                        WOQL.or(
                            WOQL.triple("v:Commit IRI", "@schema:author", "v:Author"),
                            WOQL.eq("v:Author", WOQL.node(""))
                        ),
                        WOQL.limit(1).and(
                            WOQL.or(
                                WOQL.triple("v:Commit IRI", "@schema:message", "v:Message"),
                                WOQL.eq("v:Message", WOQL.node(""))
                            ),
                            WOQL.limit(1).and(
                                WOQL.or(
                                    WOQL.and(
                                        WOQL.triple("v:Commit IRI", "@schema:parent", "v:Parent IRI"),
                                        WOQL.triple("v:Parent IRI", "@schema:identifier", "v:Parent ID")
                                    ),
                                    WOQL.and(
                                        WOQL.eq("v:Parent IRI", WOQL.node("")),
                                        WOQL.eq("v:Parent ID", WOQL.node(""))
                                    )
                                ),
                                WOQL.limit(1).and(
                                    WOQL.or(
                                        WOQL.select("v:Children").group_by(["v:Commit IRI","v:Child IRI"], "v:Child ID", "v:Children").and(
                                            WOQL.triple("v:Child IRI", "@schema:parent", "v:Commit IRI"),
                                            WOQL.triple("v:Child IRI", "@schema:identifier", "v:Child ID")
                                        ),
                                        WOQL.eq("v:Children", WOQL.node(""))
                                    ),
                                    WOQL.limit(1).or(
                                        WOQL.and(
                                            WOQL.triple("v:Branch IRI", "@schema:head", "v:Commit IRI"),
                                            WOQL.triple("v:Branch IRI", "@schema:name", "v:Branch ID")
                                        ),
                                        WOQL.and(
                                            WOQL.eq("v:Branch IRI", WOQL.node("")),
                                            WOQL.eq("v:Branch ID", WOQL.node(""))
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),
        WOQL.and(
            WOQL.select("v:Commit ID").limit("20").and(
                WOQL.triple("v:My Head IRI", "@schema:identifier", "v:Active Commit ID"),
                WOQL.and(
                    WOQL.path("v:My Head IRI", "@schema:parent+", "v:My Tail IRI", "v:Commit Path"),
                    WOQL.triple("v:My Tail IRI", "@schema:identifier", "v:Commit ID")
                )
            ),
            WOQL.using("_commits").order_by("v:Time").and(
                WOQL.triple("v:Commit IRI", "@schema:identifier", "v:Commit ID"),
                WOQL.and(
                    WOQL.triple("v:Commit IRI", "@schema:timestamp", "v:Time"),
                    WOQL.limit(1).and(
                        WOQL.or(
                            WOQL.triple("v:Commit IRI", "@schema:author", "v:Author"),
                            WOQL.eq("v:Author", WOQL.node(""))
                        ),
                        WOQL.limit(1).and(
                            WOQL.or(
                                WOQL.triple("v:Commit IRI", "@schema:message", "v:Message"),
                                WOQL.eq("v:Message", WOQL.node(""))
                            ),
                            WOQL.limit(1).and(
                                WOQL.or(
                                    WOQL.and(
                                        WOQL.triple("v:Commit IRI", "@schema:parent", "v:Parent IRI"),
                                        WOQL.triple("v:Parent IRI", "@schema:identifier", "v:Parent ID")
                                    ),
                                    WOQL.and(
                                        WOQL.eq("v:Parent IRI", WOQL.node("")),
                                        WOQL.eq("v:Parent ID", WOQL.node(""))
                                    )
                                ),
                                WOQL.limit(1).and(
                                    WOQL.or(
                                        WOQL.select("v:Children").group_by(["v:Commit IRI","v:Child IRI"], "v:Child ID", "v:Children").and(
                                            WOQL.triple("v:Child IRI", "@schema:parent", "v:Commit IRI"),
                                            WOQL.triple("v:Child IRI", "@schema:identifier", "v:Child ID")
                                        ),
                                        WOQL.eq("v:Children", WOQL.node(""))
                                    ),
                                    WOQL.limit(1).or(
                                        WOQL.and(
                                            WOQL.triple("v:Branch IRI", "@schema:head", "v:Commit IRI"),
                                            WOQL.triple("v:Branch IRI", "@schema:name", "v:Branch ID")
                                        ),
                                        WOQL.and(
                                            WOQL.eq("v:Branch IRI", WOQL.node("")),
                                            WOQL.eq("v:Branch ID", WOQL.node(""))
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    )
)